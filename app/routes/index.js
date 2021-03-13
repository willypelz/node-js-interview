let router = require('express').Router();

router.get('/', function(req, res){
    res.json({
        status: 'API its working',
        message: "Welcome to testing application server."
    });
});

let v1ApiRoutes = require('./v1-routes');

router.use('/v1',v1ApiRoutes);

module.exports = router;
