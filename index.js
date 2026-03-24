require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

getConnection();

// Rutas
app.use('/api/generos', require('./routes/generos'));
app.use('/api/directores', require('./routes/directores'));
app.use('/api/productoras', require('./routes/productoras'));
app.use('/api/tipos', require('./routes/tipos'));
app.use('/api/media', require('./routes/media'));

// Solo escucha en local, Vercel usa el export
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
  });
}

module.exports = app;