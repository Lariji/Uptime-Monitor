const express = require('express');
const pool = require('./db');
const app = express();
//if deployed, it willuse the cloud's port, otherwise use 3000 port
const PORT = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.json({message:"Uptime Monitor running"})
});

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});

app.get('/api/websites',async (req,res) =>{
    try{
        const queryText = 'SELECT * FROM websites';
        const result = await pool.query(queryText);
        res.json(result.rows);

    } catch{
        console.error("database error");
        res.status(500).json({error:"Internal server error"});
    }
    
});