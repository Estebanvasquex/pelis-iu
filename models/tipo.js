const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = model('Tipo', TipoSchema);
