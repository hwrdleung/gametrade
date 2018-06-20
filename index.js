const express = require('express');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const router = express.Router();


const user = require('./routes/user')(router);
const games = require('./routes/games')(router);


//Database
const mongoose = require('mongoose');
mongoose.connect ('mongodb://noodles01:noodles01@ds253879.mlab.com:53879/gametrade');

app.use(cors());
app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static(__dirname + '/public/'));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user', user);
app.use('/games', games);

//Route
app.get('/', (req, res)=>{
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

//Start server
app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});