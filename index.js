
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const cryptoRouter = require('./routes/cryptos.js');

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/cryptos', cryptoRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
