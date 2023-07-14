const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DBConfigLink)
const client = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = client;