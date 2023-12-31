require('dotenv').config();


const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT;
const cryptoRouter = require("./routes/cryptos.js");



app.use(cors());
app.use(express.json());
 

app.use("/api/cryptos", cryptoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
