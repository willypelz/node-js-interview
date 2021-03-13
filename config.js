// Import env package
require("dotenv").config({silent: true});


module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    mongoURI: process.env.MONGO_URI || "mongodb://database:27017/members_management",
    // mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/members_management",
    secretKey: process.env.SECRET_KEY || '_secret_key_',
    defaultRecordsPerPage: process.env.DEFAULT_RECORDS_PER_PAGE || 10,
    defaultPage: process.env.DEFAULT_PAGE || 1,
    sentryDsn: process.env.SENTRY_DSN, //|| "https://b0ea4cba4df14adb8087a5c20f3bfe6b@o495019.ingest.sentry.io/5567082",
    authSecret: process.env.AUTH_SECRET || '_secret_key_',
    mqServerUrl: process.env.MQ_SERVER_URL || 'amqp://localhost'
};
