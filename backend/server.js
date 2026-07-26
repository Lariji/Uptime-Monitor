const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({origin:'http://localhist:5173'}));

//if deployed, it will use the cloud's port, otherwise use 3000 port
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

app.post('/api/websites', async (req,res) =>{
    try{
        const {url} = req.body;
        if (!url){
            return res.status(400).json({error:"Please provide a url"});
        }

        const queryTest = 'INSERT INTO websites (url) VALUES ($1) RETURNING *';
        const result = await pool.query(queryTest,[url]);
        res.status(201).json(result.rows[0]);


    }
    catch(error){
        console.error("database error", error);
        res.status(500).json({error: "Internal server error"})
    }
})