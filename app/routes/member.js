const router = require('express').Router();

const memberController = require('../controllers/memberController');
const memberTagController = require('../controllers/memberTagController');

/* user route code */
router.post('/',  memberController.addMember);
router.get('/',  memberController.getMembers);
router.get('/:id',  memberController.getSingleMember);
router.patch('/:id',  memberController.updateMember);
router.delete('/:id',  memberController.deleteMember);


router.post('/tags',  memberTagController.addMemberTag);
router.patch('/tags/:id',  memberTagController.updateMemberTag);
router.delete('/tags/:id',  memberTagController.deleteMemberTag);

module.exports = router;
