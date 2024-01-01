const axios = require('axios');
const coinMarketCapUtils = require('../utils/coinMarketCapUtils');

const cryptoController = {
  getAllCryptos: async (req, res) => {
    try {
      const cryptos = await coinMarketCapUtils.getAllCryptos();
      res.json(cryptos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  convertCurrency: async (req, res) => {
    const { sourceCrypto, amount, targetCurrency } = req.body;
    try {
      const convertedAmount = await coinMarketCapUtils.convertCurrency(sourceCrypto, amount, targetCurrency);
      res.json({ convertedAmount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = cryptoController;
