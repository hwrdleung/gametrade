const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
const router = express.Router();



const user = require('./routes/user')(router);

//Database
const mongoose = require('mongoose');
mongoose.connect ('mongodb://noodles01:noodles01@ds253879.mlab.com:53879/gametrade');

//Middleware
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user', user);
app.use(cors());


//Route
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Start server
app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});