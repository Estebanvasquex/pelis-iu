const Director = require('../models/director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('❌ Error al obtener directores:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los directores' });
    }
};

const getDirectorById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        
        res.status(200).json(director);
    } catch (error) {
        console.error('❌ Error al obtener director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el director' });
    }
};

const createDirector = async (req = request, res = response) => {
    try {
        const { nombres, estado } = req.body;
        
        const director = new Director({ nombres, estado });
        await director.save();
        
        res.status(201).json(director);
    } catch (error) {
        console.error('❌ Error al crear director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el director' });
    }
};

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombres, estado } = req.body;
        
        const director = await Director.findByIdAndUpdate(
            id,
            { nombres, estado },
            { new: true, runValidators: true }
        );
        
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        
        res.status(200).json(director);
    } catch (error) {
        console.error('❌ Error al actualizar director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el director' });
    }
};

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const director = await Director.findByIdAndDelete(id);
        
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        
        res.status(200).json({ msg: 'Director eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el director' });
    }
};

module.exports = {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
};
