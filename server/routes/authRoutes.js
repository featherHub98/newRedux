// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const { hashPasswords } = require('../services/hashPassword');
const { comparePassword, generateToken } = require('../services/authService');
const { getUsers, saveUsers } = require('../services/dataHandler');

// POST /api/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let users = await getUsers();

        // 1. Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // 2. Hash the password (using hashPassword.js)
        const hashedPassword = await hashPasswords(password);

        // 3. Create new user object with an ID
        const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = {
            id: newUserId,
            name: name,
            email: email,
            pwd: hashedPassword, // Store the HASHED password
        };

        // 4. Add new user and save to JSON file
        users.push(newUser);
        await saveUsers(users);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await getUsers();

        // 1. Find user in the JSON file
        const user = users.find(u => u.email === email);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 2. Compare password (using authService.js)
        const isPasswordValid = await comparePassword(password, user.pwd);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 3. Generate Token (using authService.js)
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

module.exports = router;