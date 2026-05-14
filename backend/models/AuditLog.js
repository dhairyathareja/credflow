const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({

    invoiceNo: String,
    clientName: String,
    tone: String,
    emailContent: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('AuditLog', auditSchema);