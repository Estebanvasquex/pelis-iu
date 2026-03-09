const Genero = require('../models/genero');
const { request, response } = require('express');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('❌ Error al obtener géneros:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros' });
    }
};

const getGeneroById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findById(id);
        
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        
        res.status(200).json(genero);
    } catch (error) {
        console.error('❌ Error al obtener género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el género' });
    }
};

const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        
        const genero = new Genero({ nombre, estado, descripcion });
        await genero.save();
        
        res.status(201).json(genero);
    } catch (error) {
        console.error('❌ Error al crear género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el género' });
    }
};

const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;
        
        const genero = await Genero.findByIdAndUpdate(
            id,
            { nombre, estado, descripcion },
            { new: true, runValidators: true }
        );
        
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        
        res.status(200).json(genero);
    } catch (error) {
        console.error('❌ Error al actualizar género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el género' });
    }
};

const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const genero = await Genero.findByIdAndDelete(id);
        
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        
        res.status(200).json({ msg: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el género' });
    }
};

module.exports = {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
};