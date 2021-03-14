let router = require('express').Router();
const memberRoutes = require('./member');
const tagRoutes = require('./tag');


router.get('/', function (req, res) {
    res.json({
        status: 'version 1 API its working',
        message: "Version 1"
    });
});

router.use('/members', memberRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
