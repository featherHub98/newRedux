// server/services/dataHandler.js (CommonJS)
const fs = require('fs').promises;
const path = require('path');

// Assuming you still use the path from the previous example:
const DATA_FILE_PATH = path.resolve(__dirname, '../data/users.json');

// Reads the JSON file and returns the users array
async function getUsers() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
        // Handle case where file is empty (e.g., brand new file)
        if (data.trim() === '') {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        // 🚨 CRITICAL DEBUG STEP: Log the actual error
        console.error('Data Handler Error in getUsers:', error.code, error.message);
        throw new Error('Could not read user data, check server logs for details.');
    }
}

// Writes the updated users array back to the JSON file
async function saveUsers(users) {
    try {
        const jsonContent = JSON.stringify(users, null, 2);
        await fs.writeFile(DATA_FILE_PATH, jsonContent, 'utf8');
    } catch (error) {
        console.error('Data Handler Error in saveUsers:', error.code, error.message);
        throw new Error('Could not save user data, check server logs for details.');
    }
}

module.exports = {
    getUsers,
    saveUsers,
};