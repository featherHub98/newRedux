const express = require('express');
const app = express();

const { hashPasswords } = require('../services/hashPassword');
const { comparePassword, generateToken } = require('../services/authService');
const { getUsers, saveUsers } = require('../controller/dataHandler');


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let users = await getUsers();

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
                    }

        const hashedPassword = await hashPasswords(password);

        const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = {
            id: newUserId,
            name: name,
            email: email,
            pwd: hashedPassword,
        };
    
        users.push(newUser);
        await saveUsers(users);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await comparePassword(password, user.pwd);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = await generateToken(email);

        res.json({
            success: true,
            token: token,
            user: { email: user.email }
        });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
});
app.get('/protected', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const users = await getUsers();
    try {
        const { verifyToken } = require('../services/authService');
        const decoded = await verifyToken(token);
        res.json({ message: 'Protected data accessed', users: users });
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
});
module.exports = app;