const Media = require('../models/media');
const { request, response } = require('express');

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find()
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');
        res.status(200).json(medias);
    } catch (error) {
        console.error('❌ Error al obtener medias:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las medias' });
    }
};

const getMediaById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id)
            .populate('genero', 'nombre descripcion')
            .populate('director', 'nombres')
            .populate('productora', 'nombre slogan')
            .populate('tipo', 'nombre descripcion');
        
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        
        res.status(200).json(media);
    } catch (error) {
        console.error('❌ Error al obtener media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener la media' });
    }
};

const createMedia = async (req = request, res = response) => {
    try {
        const { serial, titulo, sinopsis, url, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;
        
        const media = new Media({
            serial,
            titulo,
            sinopsis,
            url,
            imagenPortada,
            anioEstreno,
            genero,
            director,
            productora,
            tipo
        });
        
        await media.save();
        
        const mediaPopulated = await Media.findById(media._id)
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');
        
        res.status(201).json(mediaPopulated);
    } catch (error) {
        console.error('❌ Error al crear media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la media' });
    }
};

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { serial, titulo, sinopsis, url, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;
        
        const media = await Media.findByIdAndUpdate(
            id,
            { serial, titulo, sinopsis, url, imagenPortada, anioEstreno, genero, director, productora, tipo },
            { new: true, runValidators: true }
        )
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');
        
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        
        res.status(200).json(media);
    } catch (error) {
        console.error('❌ Error al actualizar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la media' });
    }
};

const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const media = await Media.findByIdAndDelete(id);
        
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        
        res.status(200).json({ msg: 'Media eliminada correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la media' });
    }
};

module.exports = {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};
