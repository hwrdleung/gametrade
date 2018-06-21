const Game = require('../models/game');
const request = require('request');
const IGDB_USER_KEY = '09f049c49c43481b21812a91f6559298';

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

  router.get('/igdb_keyword_search/*', function(req, res, next){
    let params = req.params['0'];
    let options = {
        uri:'https://api-endpoint.igdb.com/games/?search=' + params,
        headers: {
            'Accept': 'application/json',
            'user-key': IGDB_USER_KEY
        }
    }
    request(options).pipe(res);
});

router.get('/igdb_game_id_search/*', function(req, res, next){
    let params = req.params['0'];
    let options = {
        uri:'https://api-endpoint.igdb.com/games/' + params,
        headers: {
            'Accept': 'application/json',
            'user-key': IGDB_USER_KEY
        }
    }
    request(options).pipe(res);
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