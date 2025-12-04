// server/server.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Authentication Server is running.');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});