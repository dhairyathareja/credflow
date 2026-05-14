const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI;
let model;

const initGemini = () => {
    if (!genAI) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing from environment variables.");
        }
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });
    }
};

const generateEmail = async (invoice, tone, days) => {
    initGemini();

    const prompt = `
    Generate a professional payment reminder email.

    Client Name: ${invoice.client_name}
    Invoice No: ${invoice.invoice_no}
    Amount: ${invoice.amount}
    Due Date: ${invoice.due_date}
    Days Overdue: ${days}

    Tone: ${tone}

    Include CTA.
    `;

    const modelNames = ["gemini-flash-latest", "gemini-2.5-flash", "gemini-pro-latest"];
    
    for (const modelName of modelNames) {
        try {
            const currentModel = genAI.getGenerativeModel({ model: modelName });
            const result = await currentModel.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            // If it's not a 404, it might be a rate limit or auth error, so we stop trying others
            if (!error.message.includes("404")) {
                break;
            }
        }
    }

    return `[Automated Reminder for ${invoice.invoice_no}] - AI generation failed after trying updated models, but this record is being tracked for follow-up.`;
};

module.exports = generateEmail;