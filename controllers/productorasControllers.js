const Productora = require('../models/productora');
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('❌ Error al obtener productoras:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las productoras' });
    }
};

const getProductoraById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findById(id);
        
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        
        res.status(200).json(productora);
    } catch (error) {
        console.error('❌ Error al obtener productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener la productora' });
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        
        const productora = new Productora({ nombre, estado, slogan, descripcion });
        await productora.save();
        
        res.status(201).json(productora);
    } catch (error) {
        console.error('❌ Error al crear productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la productora' });
    }
};

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado, slogan, descripcion } = req.body;
        
        const productora = await Productora.findByIdAndUpdate(
            id,
            { nombre, estado, slogan, descripcion },
            { new: true, runValidators: true }
        );
        
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        
        res.status(200).json(productora);
    } catch (error) {
        console.error('❌ Error al actualizar productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la productora' });
    }
};

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        const productora = await Productora.findByIdAndDelete(id);
        
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        
        res.status(200).json({ msg: 'Productora eliminada correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la productora' });
    }
};

module.exports = {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora,
    deleteProductora
};
