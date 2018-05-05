const User = require('../models/user');
const Game = require('../models/game');
const mongoose = require('mongoose');

module.exports = (router) => {

  router.get('/get_all', (req, res)=>{
      //This will be changed to find games that match
      //criteria specified by the client
      Game.find({}, (err, data)=>{
          if(err){
              console.log(err);
          }
          console.log(data);
          res.send(data);
      });
  });

    return router;
}