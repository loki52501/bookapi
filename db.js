const { Pool } = require('pg');
const client = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = client;