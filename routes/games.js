const Game = require('../models/game');
const request = require('request');
const IGDB_USER_KEY = '9786dd72438c7d688bcf086f44694145';

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

  router.get('/igdb_keyword_search/*', function(req, res){
    let params = req.params['0'];
    let options = {
        uri:'https://api-v3.igdb.com/games/',
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'user-key': IGDB_USER_KEY
        },
        body: `fields name, involved_companies; search " ${params}";`
    }
    request(options).pipe(res);
});

router.get('/igdb_cover_search/*', function(req, res) {
    let params = req.params['0'];

    let options = {
        url: 'https://api-v3.igdb.com/covers/',
        headers: {
            'Accept': 'application/json',
            'user-key': IGDB_USER_KEY
        },
        body : `fields *; where game=${params};`
    }
    request(options).pipe(res);
});

router.get('/igdb_game_id_search/*', function(req, res){
    let params = req.params['0'];
    let options = {
        uri:'https://api-v3.igdb.com/games/',
        headers: {
            'Accept': 'application/json',
            'user-key': IGDB_USER_KEY
        },
        body: "fields *; where id = " + params + ";"
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