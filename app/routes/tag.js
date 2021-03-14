const router = require('express').Router();

const tagController = require('../controllers/tagController');

/* user route code */
router.post('/',  tagController.addTag);
router.get('/',  tagController.getTags);
router.get('/:id',  tagController.getSingleTag);
router.patch('/:id',  tagController.updateTag);
router.delete('/:id',  tagController.deleteTag);

module.exports = router;
