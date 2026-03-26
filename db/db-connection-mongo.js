const mongoose = require('mongoose');

let isConnected = false;

const getConnection = async () => {
  if (isConnected) return;

  try {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url);
    isConnected = true;
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    throw error;
  }
};

module.exports = { getConnection };
