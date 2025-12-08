const fs = require('fs').promises;
const path = require('path');

const DATA_FILE_PATH = path.resolve(__dirname, '../config/users.json');

async function getUsers() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf8');

        if (data.trim() === '') {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('Data Handler Error in getUsers:', error.code, error.message);
        throw new Error('Could not read user data, check server logs for details.');
    }
}

async function saveUsers(users) {
    try {
        const jsonContent = JSON.stringify(users, null, 2);
        await fs.writeFile(DATA_FILE_PATH, jsonContent, 'utf8');
    } catch (error) {
        console.error('Data Handler Error in saveUsers:', error.code, error.message);
        throw new Error('Could not save user data, check server logs for details.');
    }
}
async function updateFiles(files) {
    const FILES_DATA_PATH = path.resolve(__dirname, '../config/files.json');
    try {
        const jsonContent = JSON.stringify(files, null, 2);
        await fs.writeFile(FILES_DATA_PATH, jsonContent, 'utf8');
    } catch (error) {
        console.error('Data Handler Error in updateFiles:', error.code, error.message);
        throw new Error('Could not save files data, check server logs for details.');
    }
}
async function readFiles(files) {
    const FILES_DATA_PATH = path.resolve(__dirname, '../config/files.json');
    try{
        await fs.readFile(FILES_DATA_PATH, 'utf8');
    } catch (error) {
        console.error('Data Handler Error in readFiles:', error.code, error.message);
        throw new Error('Could not read files data, check server logs for details.');
    }
    
}
module.exports = {
    getUsers,
    saveUsers,
    updateFiles
};