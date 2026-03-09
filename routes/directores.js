const { Router } = require('express');
const { getDirectores, getDirectorById, createDirector, updateDirector, deleteDirector } = require('../controllers/directoresControllers');

const router = Router();

router.get('/', getDirectores);
router.get('/:id', getDirectorById);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;
