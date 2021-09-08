const Character = require('../models/characterModel');

const { getPostData } = require('../utils');

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
       const body = await getPostData(req);

        const { name, filiation, type } = JSON.parse(body);

       const character = {
        name,
        filiation,
        type
    }

    const newCharacter = await Character.createCharacter(character);

    res.writeHead(201, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify(newCharacter)); 

        

    } catch (error) {
        console.log(error);
    }
}

// Modifier un personnage
// @route PUT /api/characters/:id
async function updateCharacter(req, res, id){
    try {
        const character = await Character.findById(id)

        if(!character){
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message : 'Character Not Found'}));
        }else{
             const body = await getPostData(req);

        const { name, filiation, type } = JSON.parse(body);

       const characterdata = {
        name: name || character.name,
        filiation: filiation || character.filiation,
        type: type || character.type
        }

        const updCharacter = await Character.updateCharacter(id, characterdata);

        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(updCharacter)); 
        }

    } catch (error) {
        console.log(error);
    }
}

// Supprimer un personnage
// @route DELETE /api/characters
async function deleteCharacter(req, res, id){
    try {
        const character = await Character.findById(id);

        if(!character){
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message : 'Character Not Found'})); 
        }else{
            await Character.removeCharacter(id)
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Character ${id} removed`}));
        }    
    }catch (error) {
    console.log(error);
    }
}


module.exports = {
    getCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
}