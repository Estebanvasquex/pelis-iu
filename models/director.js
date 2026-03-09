const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios'],
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

module.exports = model('Director', DirectorSchema);
