const http = require('http');
const {getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter} = require('./controllers/characterController')

const server = http.createServer((req, res) =>{

    if(req.url === '/api/characters' && req.method === 'GET'){
        getCharacters(req, res);
    }else if(req.url.match(/\/api\/characters\/([0-9]+)/) && req.method === 'GET'){

        const id = req.url.split('/')[3]
        getCharacter(req, res, id)
    }else if(req.url === '/api/characters' && req.method === 'POST'){
        createCharacter(req, res);
    }else if(req.url.match(/\/api\/characters\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateCharacter(req, res, id);
    }else if(req.url.match(/\/api\/characters\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        deleteCharacter(req, res, id);
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route Not Found'}));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))