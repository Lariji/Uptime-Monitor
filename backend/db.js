// loading variables and importing the pool
require('dotenv').config({path:'../.env'});
const { Pool } = require('pg');

// Creating a new pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function testDbConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully at:', res.rows[0].now);
    } catch(err) {
        console.error('Connection failed:', err);
    }
}
testDbConnection();

// exporting so other files can use the connection
module.exports = pool;