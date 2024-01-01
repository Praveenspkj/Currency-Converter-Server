
const axios = require('axios');

const COINMARKETCAP_API_URL = process.env.COINMARKETCAP_API_URL;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const coinMarketCapUtils = {
  getAllCryptos: async () => {
    try {
      const response = await axios.get(`${COINMARKETCAP_API_URL}/cryptocurrency/listings/latest`, {
        params: {
          limit: 100,
        },
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        },
      });

      const cryptos = response.data.data.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
      }));

      return cryptos;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  },

  convertCurrency: async (sourceCrypto, amount, targetCurrency) => {
    try {
      const response = await axios.get(`${COINMARKETCAP_API_URL}/tools/price-conversion`, {
        params: {
          amount: amount,
          symbol: sourceCrypto,
          convert: targetCurrency,
        },
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        },
      });

      const convertedAmount = response.data.data.quote[targetCurrency]?.price;

      if (isNaN(convertedAmount)) {
        throw new Error('Invalid conversion data');
      }

      return convertedAmount;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  },
};

module.exports = coinMarketCapUtils;
