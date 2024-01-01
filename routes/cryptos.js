// routes/cryptos.js
const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getAllCryptos', cryptoController.getAllCryptos);
router.post('/convertCurrency', authMiddleware, cryptoController.convertCurrency);

module.exports = router;
