const express = require('express');
const whatsappController = require('../controllers/whatsappController');
const router = express.Router();

router.post('/send-whatsapp', whatsappController.sendWhatsApp);

module.exports = router;