require('dotenv').config();
const express= require("express");
const router = express.Router();
const axios = require('axios');


const COINMARKETCAP_API_URL=process.env.COINMARKETCAP_API_URL
const COINMARKETCAP_API_KEY=process.env.COINMARKETCAP_API_KEY

router.get('/getAllCryptos',async (req, res) => {
    try {COINMARKETCAP_API_URL
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
    
        res.json(cryptos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

});

router.post('/convertCurrency',async (req, res) => {
   
    const { sourceCrypto, amount, targetCurrency } = req.body;
   
    try {
      const response = await axios.get(`${COINMARKETCAP_API_URL}/tools/price-conversion`, {
        params: {
          amount:amount,
          symbol:sourceCrypto,
          convert:targetCurrency,
        },
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        },
      });
     
      const convertedAmount =response.data.data.quote[targetCurrency]?.price;
    
      if (isNaN(convertedAmount)) {
        throw new Error('Invalid conversion data');
      }
      console.log(convertedAmount)
      res.json({ convertedAmount });
    } catch (error) {
 
      res.status(500).json({ error: 'Internal Server Error' });
    }


});



module.exports = router;