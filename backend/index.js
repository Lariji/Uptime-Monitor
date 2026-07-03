const pool = require('./db');

async function tryWebsite(id,website){
    //keeping it as variable to the unse it as paramaterised query
    let isUp = false;
    try{
        const response = await fetch(website);

        if(response.ok){
            console.log(`${website} is up`);
            isUp = true;
        }
        else{
            console.log(`${website} is down`);
            isUp = false;
        }
    }
    catch(error){
        console.log(`${website} might not exist, check again`);
        isUp = false;
    }
    try{
        const queryText = 'INSERT INTO ping_results (website_id, is_up) VALUES ($1, $2)';
        const values = [id,isUp];

        await pool.query(queryText,values);
        await checkIncident(id,website)
        console.log(`Saved resuls for ${website}.`)

    }catch(dbError){
        console.error(`Failed to save ping result for ${website}`,dbError)
    }
}

async function runMonitor(){
    console.log("pinging")
    try{
    const result = await pool.query('SELECT id,url FROM websites')
    for (const website of result.rows){
    tryWebsite(website.id,website.url);
    }}
    catch(err){
        console.error("Failed to fetch websites:",err)
    }
}

async function checkIncident(websiteId,websiteUrl){
    try{
        const queryText = 'SELECT is_up FROM ping_results WHERE website_id = $1 ORDER BY pinged_at DESC LIMIT 3';
        const result = await pool.query(queryText,[websiteId]);
        if (result.rows.length < 3) {
            return; 
        }
        const isAlwaysDown = result.rows.every(row => row.is_up === false);

        if (isAlwaysDown){
            console.error(`Incident triggered, ${websiteUrl} has been down 3 times`)
        }
        
    }catch(err){
        console.error('Error checking : ',err)
    }

}

setInterval(runMonitor,30000)
