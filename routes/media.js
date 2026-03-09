const { Router } = require('express');
const { getMedias, getMediaById, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaControllers');

const router = Router();

router.get('/', getMedias);
router.get('/:id', getMediaById);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
