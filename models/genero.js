const { Schema, model } = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    descripcion: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = model('Genero', GeneroSchema);