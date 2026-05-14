const express = require('express');

const router = express.Router();

const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
});

const {
    uploadInvoices,
    getLogs,
    getStats
} = require('../controllers/invoiceController');

router.post(
    '/upload',
    upload.single('file'),
    uploadInvoices
);

router.get('/logs', getLogs);
router.get('/stats', getStats);

module.exports = router;