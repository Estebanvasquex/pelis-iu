require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

getConnection();

app.listen(port, () => {
  console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
});