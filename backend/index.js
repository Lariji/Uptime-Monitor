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
