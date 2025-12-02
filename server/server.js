// server/server.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Set up the authentication routes
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Authentication Server is running.');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});