let router = require('express').Router();


router.get('/', function (req, res) {
    res.json({
        status: 'version 1 API its working',
        message: "Version 1"
    });
});


module.exports = router;
