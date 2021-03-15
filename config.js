// Import env package
require("dotenv").config({silent: true});


module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    mongoURI: process.env.mongoURI || "mongodb://localhost:27017/members_management",
    secretKey: process.env.SECRET_KEY || '_secret_key_',
    defaultRecordsPerPage: process.env.DEFAULT_RECORDS_PER_PAGE || 10,
    defaultPage: process.env.DEFAULT_PAGE || 1,
    mqServerUrl: process.env.MQ_SERVER_URL || 'amqp://localhost'
};
