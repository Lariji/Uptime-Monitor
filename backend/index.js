// loading variables and importing the pool
require('dotenv').config({path:'../.env'});
const {Pool} = require('pg');

//Creating a new pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{rejectUnauthorized: false }
})
// checking connection
async function testDbConnection(){
    try{
        const res = await pool.query('SELECT NOW()');
        console.log(' Database connected successfully at:', res.rows[0].now);
    } catch(err){
        console.error('Connection failed:',err)
    }
}
testDbConnection();


const websites = [
    "https://www.google.com/",
    "https://www.mdlmdlmdl.co/",
    "https://httpbin.org/status/500"];

async function tryWebsite(website){
    try{
        const response = await fetch(website);

        if(response.ok){
            console.log(`${website} is up`);
        }
        else{
            console.log(`${website} is down`);
        }
    }
    catch(error){
        console.log(`${website} might not exist, check again`);
    }
}

function runMonitor(){
    console.log("pinging")
    for (const website of websites){
    tryWebsite(website);
    }
}

runMonitor();
setInterval(runMonitor,60000)
