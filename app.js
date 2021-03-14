//Import Express
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const handlebars = require('express-handlebars')

// Initialize App
const app = express();


//cors
app.use(cors());

// Import App Config
const config = require("./config");


// define directory
global.__base = __dirname + '/';
global.__utils = __dirname + '/app/utils/';
global.__modules = __dirname + '/app/modules/';

try {
// Database configuration
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
} catch (err) {
    console.log("Error connecting Mongodb");
    console.log(err.message)
}


// Setup  server port
const port = config.port;
// Application Route
const apiRoutes = require("./app/routes/index");


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

app.use('/', apiRoutes);


app.use('/docs', express.static(__dirname + '/apidoc/index.html'));

// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running on port " + port);
});
