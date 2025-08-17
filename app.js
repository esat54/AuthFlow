require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); 

const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(session({
    secret: 'hidden-key',
    resave: false, 
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));