const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

//DB Config
const { dbConnection } = require('./database/config');
dbConnection();

//App de Express
const app = express();

//CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-Width, Content-Type, Accept, Credentials');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Lectura y parseo de Body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Node Server
const server = require('http').createServer(app);

//Public Path
const publicPath = path.resolve(__dirname,  'public');
app.use(express.static(publicPath));

//Routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/parameter', require('./routes/parameter'));
app.use('/api/product', require('./routes/product'));
app.use('/api/color', require('./routes/color'));

server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);

    console.log('Server running in Port', 3000);
});