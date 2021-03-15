const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const config = require( '../../config');

// sentry setup
Sentry.init({
    dsn: config.sentryDsn,
    tracesSampleRate: 1.0,
  });


module.exports = Sentry;
