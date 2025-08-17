// db/connection.js
const { Pool } = require('pg');

const dbBaglantisi = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: { rejectUnauthorized: false }
});

module.exports = dbBaglantisi;