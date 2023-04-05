//First we declare our DEPENDENCIES and the Modules that make them work!
const http = require('http');
const fs = require('fs');
const port = 3000

const server = http.createServer((req, res)=> {
    console.log(req.url)
    const index = req.url.slice(6)
    if(req.url === "/pets") {
        fs.readFile("pets.json","utf-8", (err, data) => {
            if (err) {
                console.error(err);
                } else {
                    console.log(data);
                    res.writeHead(200, {"content-type": "application/json"})
                    res.write(data);
                    res.end();
                }
            })
    } else if (req.url === `/pets/${index}`) {
        fs.readFile("pets.json", "utf-8", (err, data) => {
            let pets = JSON.parse(data);
            let pet = JSON.stringify(pets[index]);
            
            if (err) {
                console.log(err);
            } else if (!pet || Number(index)<0) {
                res.writeHead(404, {"content-type": "text/plain"})
                res.write("Not found");
                res.end();
            } else {
                res.writeHead(200, {"content-type": "application/json"})
                res.write(pet);
                res.end();
            }
        })
    }

})

server.listen(port,(err)=> {
    console.log(`listening on port ${port}`);
})