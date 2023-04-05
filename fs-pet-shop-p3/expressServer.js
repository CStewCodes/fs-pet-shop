/* 
TOP
-Dependencies
Middle
-server functions
Bottom
-Listening for clients to access the server
*/

// [1] declare your DEPENDENCIES
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// [2] create the server
// `express` is a framework built upon HTTP and `exress` is a module in NodeJS.
app.get('/pets', (req, res) => {
    fs.readFile("pets.json", "utf-8", (err, data)=> {
        console.log(data);
        // res.status(200);
        res.setHeader("Content-Type", "application/json")
        res.send(data);
    })
})
app.get('/pets/:index', (req, res) => {
    let index = req.params.index;
    
    fs.readFile("pets.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let petsJSON = JSON.parse(data);
        let pet = petsJSON[index];
        if(!pet || index < 0) {
            res.sendStatus(404);
        } else {
            res.send(pet);
        }
    }
    )
})

//[3] tell the server to listen for clients! In other words,
//This is starting the server

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})