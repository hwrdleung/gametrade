const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const router = express.Router();

const user = require('./routes/user')(router);
const games = require('./routes/games')(router);
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.bcrypt = bcrypt;


//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://noodles01:noodles01@ds253879.mlab.com:53879/gametrade');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', user);
app.use('/games', games);

//Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Start server
app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + port);
});