const Tipo = require('../models/tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('❌ Error al obtener tipos:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los tipos' });
    }
};

const getTipoById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        
        res.status(200).json(tipo);
    } catch (error) {
        console.error('❌ Error al obtener tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el tipo' });
    }
};

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;
        
        const tipo = new Tipo({ nombre, descripcion });
        await tipo.save();
        
        res.status(201).json(tipo);
    } catch (error) {
        console.error('❌ Error al crear tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el tipo' });
    }
};

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        
        const tipo = await Tipo.findByIdAndUpdate(
            id,
            { nombre, descripcion },
            { new: true, runValidators: true }
        );
        
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        
        res.status(200).json(tipo);
    } catch (error) {
        console.error('❌ Error al actualizar tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo' });
    }
};

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const tipo = await Tipo.findByIdAndDelete(id);
        
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        
        res.status(200).json({ msg: 'Tipo eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el tipo' });
    }
};

module.exports = {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo
};
