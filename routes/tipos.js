const { Router } = require('express');
const { getTipos, getTipoById, createTipo, updateTipo, deleteTipo } = require('../controllers/tiposControllers');

const router = Router();

router.get('/', getTipos);
router.get('/:id', getTipoById);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

module.exports = router;
