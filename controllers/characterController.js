const Character = require('../models/characterModel');

// Appeler tous les personnages
// @route GET /api/characters
async function getCharacters(req, res){
    try {
        const characters = await Character.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(characters));
    } catch (error) {
        console.log(error);
    }
}

// Appeler un personnage
// @route GET /api/characters/:id
async function getCharacter(req, res, id){
    try {
        const character = await Character.findById(id);

        if(!character){
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message : 'Character Not Found'})); 
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(character));
        }    
    }catch (error) {
    console.log(error);
    }
}

// Ajouter un personnage
// @route POST /api/characters
async function createCharacter(req, res){
    try {
        const character = {
            name: 'Splinter',
            filiation: 'Tortues',
            type: 'Mutant'
        }

        const newCharacter = Character.createCharacter(character);

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newCharacter));

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCharacters,
    getCharacter,
    createCharacter
}