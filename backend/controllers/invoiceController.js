const fs = require('fs');

const csv = require('csv-parser');

const generateEmail = require('../services/geminiService');

const getTone = require('../utils/escalationLogic');

const sendEmail = require('../utils/sendEmail');

const AuditLog = require('../models/AuditLog');

const uploadInvoices = async (req, res) => {

    const results = [];

    fs.createReadStream(req.file.path)
    .pipe(csv({
        mapHeaders: ({ header }) => header.trim().replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "").toLowerCase()
    }))
    .on('data', (data) => {
        // Trim all values
        const cleanData = {};
        for (const key in data) {
            cleanData[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
        }
        results.push(cleanData);
    })
    .on('error', (error) => {
        if (!res.headersSent) res.status(500).json({ error: 'Failed to parse CSV: ' + error.message });
    })
    .on('end', () => {
        if (!process.env.GEMINI_API_KEY) {
            if (!res.headersSent) {
                res.status(500).json({ error: "GEMINI_API_KEY is not configured in the backend." });
            }
            return;
        }

        // Return immediately so the UI doesn't hang
        if (!res.headersSent) {
            res.json({ message: `Successfully queued ${results.length} records for background processing.` });
        }

        // Process in background asynchronously
        (async () => {
            try {
                for(const invoice of results){
                    if (!invoice.due_date) {
                        console.log("Skipping record with missing due_date:", invoice);
                        continue;
                    }

                    // Robust date parsing (handles DD-MM-YYYY, DD/MM/YYYY, etc)
                    let dateStr = invoice.due_date;
                    if (dateStr.includes('-') || dateStr.includes('/')) {
                        const parts = dateStr.split(/[-/]/);
                        // If it looks like DD-MM-YYYY (parts[0] is 1-31, parts[2] is 4 digits)
                        if (parts[0].length <= 2 && parts[2].length === 4) {
                            dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        }
                    }

                    const dueDate = new Date(dateStr);
                    if (isNaN(dueDate.getTime())) {
                        console.log("Skipping record with invalid due_date format:", invoice.due_date);
                        continue;
                    }

                    const today = new Date();
                    const days = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

                    const tone = getTone(days);

                    if(tone === "Legal Escalation"){
                        await AuditLog.create({
                            invoiceNo: invoice.invoice_no || "UNKNOWN",
                            clientName: invoice.client_name || "UNKNOWN",
                            tone,
                            emailContent: "Flagged for manual review",
                            status: "Escalated"
                        });
                        continue;
                    }

                    const email = await generateEmail(invoice, tone, days);
                    const status = await sendEmail(invoice.email, `Reminder ${invoice.invoice_no}`, email);

                    await AuditLog.create({
                        invoiceNo: invoice.invoice_no || "UNKNOWN",
                        clientName: invoice.client_name || "UNKNOWN",
                        tone,
                        emailContent: email,
                        status
                    });
                }
            } catch (error) {
                // Silently handle
            }
        })();
    });
};

const getLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const total = await AuditLog.countDocuments();
        const success = await AuditLog.countDocuments({ status: "Success" });
        const failed = await AuditLog.countDocuments({ status: "Failed" });
        const escalated = await AuditLog.countDocuments({ status: "Escalated" });
        
        res.json({ total, success, failed, escalated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadInvoices,
    getLogs,
    getStats
};