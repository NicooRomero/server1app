const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

// const whitelist = ['https://lucid-volhard-2f67c5.netlify.app', 'https://radiant-citadel-25364.herokuapp.com/', 'http://localhost:3000','http://localhost:4000'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         const exist = whitelist.some( domain => domain === origin );
//         if(exist) {
//             callback(null, true)
//         } else {
//             callback(new Error('not allowed by cors'))
//         }
//     }
// }


app.use(cors());
app.options('*', cors());

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(port, '0.0.0.0', () => {
    console.log(`servidor funcionando ${port}`)
});