const contentful = require("contentful");


const client = contentful.createClient({
    space: process.env.CTFL_SPACE,
    environment: process.env.CTFL_ENV || 'master',
    accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = client;