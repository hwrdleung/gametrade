const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('./routes/user')(router);
const games = require('./routes/games')(router);


//Database
const mongoose = require('mongoose');
mongoose.connect ('mongodb://noodles01:noodles01@ds253879.mlab.com:53879/gametrade');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname));
app.use('/user', user);
app.use('/games', games);
app.use(cors());

//Route
app.get('/', (req, res)=>{
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

//Start server
app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});