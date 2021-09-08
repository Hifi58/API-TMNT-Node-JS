const characters = require('../data/characters');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(characters)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const character = characters.find((p) => p.id === id)
        resolve(character)
    })
}

function createCharacter(character) {
    return new Promise((resolve, reject) => {
        const newCharacter = {id: uuidv4(), ...character}
        characters .push(newCharacter);
        writeDataToFile('./data/characters.json', character)
        resolve(newCharacter)
    })
}

module.exports = {
    findAll,
    findById,
    createCharacter
}