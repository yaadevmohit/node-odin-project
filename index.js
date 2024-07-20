const http = require('http');
const fs = require('fs');
const path = require('path');


const hostname = '127.0.0.1';
const port = 3000;

function handleGetRequest(url, req, res) {
    const availableUrls = ['/about-me', '/contact'] 
    let filePath;
    if (url === "/") {
        filePath = 'public/index.html'
    } else if (availableUrls.includes(url)) {
        filePath = `public${url}.html`
    } else {
        filePath = "public/404.html"
    }
    fs.readFile(path.join(__dirname, filePath), (err, content) => {
        if(err) {
            res.writeHead(500);
            res.end(`Error Loading ${filePath}`)
        } else {
            res.writeHead(200, {'Content-type': "text/html"});
            res.end(content);
        }
    })
}

const server = http.createServer((req, res) => {
    const {method, url} = req;
    if (method === "GET") {
        handleGetRequest(url,req, res)
    } 
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})