const { Router } = require('express');
const { getProductoras, getProductoraById, createProductora, updateProductora, deleteProductora } = require('../controllers/productorasControllers');

const router = Router();

router.get('/', getProductoras);
router.get('/:id', getProductoraById);
router.post('/', createProductora);
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;
