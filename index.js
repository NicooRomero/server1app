const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(port, '0.0.0.0', () => {
    console.log(`servidor funcionando ${port}`)
});