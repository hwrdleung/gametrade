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
          res.send(data);
      });
  });

  router.post('/delete_all', (req, res) => {
    //Find and delete all games in the 'Game' collection
    Game.find({}).exec()
        .then(function (data) {
            data.forEach(function (game) {
                game.remove();
            });
            return;
        })

        .then(function () {
            return res.json({
                success: true,
                msg: 'All games have been deleted from the database.'
            });
        })
        .catch(error => { console.log('Error:', error.message); });
});

  
    return router;
}