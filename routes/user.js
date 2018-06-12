const User = require('../models/user');
const Game = require('../models/game');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = (router) => {


    router.post('/delete_all', (req, res) => {
        //This will be changed to find games that match
        //criteria specified by the client
        Game.find({}, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                let game_id = data[i]._id;

                Game.findByIdAndRemove({ _id: game_id }, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Game Removed', data[i].title);
                });
            }

        });
    });

    //POST request from login form
    router.post('/login', (req, res) => {
        console.log('login request');
        //Get user record from DB
        User.findOne({ username: req.body.username }, (err, user) => {
            console.log(user);
            //user is an array of objects
            if (err) {
                console.log(err);
            }

            if (!user) { //No record with this username
                res.json({
                    success: false,
                    msg: 'User not found.'
                });
            } else if (user) { //User found. 
                //Check password from login form against user's stored hash
                bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                    //res is a bool
                    if (err) {
                        console.log(err);
                    }

                    if (!isValid) {
                        //Password does not match hash, return error msg to client
                        res.json({
                            success: false,
                            msg: 'Invalid password.'
                        });
                    } else if (isValid) {
                        //Password matches hash, assign JWT and send to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({
                                success: true,
                                msg: 'Password accepted',
                                token: token
                            });
                        });
                    }
                });
            }
        });
    });

    //POST request from registration form
    router.post('/register', (req, res) => {

        //Hash Password with bcrypt
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            //Create new user
            var newUser = new User({
                first: req.body.first,
                last: req.body.last,
                email: req.body.email,
                username: req.body.username,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                password: hash,
            });

            //Save new user to DB
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                }
                console.log('New user registered');
                res.json({
                    success: true,
                    msg: 'Registration successful'
                });
            });
        });
    });

    router.post('/delete', (req, res) => {

        let token = req.body.token;
        let password = req.body.password;

        console.log(password);

        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            User.findOne({ _id: payload.user._id }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                console.log('USER FOUND');

                bcrypt.compare(password, user.password, (err, isValid) => {
                    //res is a bool
                    if (err) {
                        console.log(err);
                    }

                    if (!isValid) {
                        //Password does not match hash, return error msg to client
                        res.json({
                            success: false,
                            msg: 'Invalid password.'
                        });
                    } else if (isValid) {
                        //Password matches hash, delete account and send msg back to client
                        //Remove all games owned by this user from games collection

                        console.log(payload.user.username);
                        Game.find({owner: payload.user.username}, (err, games)=>{
                            if(err){
                                console.log(err);
                            }

                            games.forEach(function(game){
                                game.remove();
                            });

                            user.remove();
                            res.json({
                                success: true,
                                msg: 'Account has been deleted.',
                            });
                        });
                    }
                });
            });
        });
    });

    //I used numbers to indicate the layers of callback-hell
    router.post('/email', (req, res) => {

        let token = req.body.token;
        let newEmail = req.body.formData.newEmail;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                //3.  Save new data to user's record in database
                user.email = newEmail;
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else if (!err) {
                        console.log("User's new email address has been saved.");

                        //User's new location has been successfuly saved.
                        //4.  Send new JWT back to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({
                                success: true,
                                msg: 'New Email Address Saved',
                                token: token
                            });
                        });
                    }
                });
            });
        });
    });

    //Client request to change user's location
    router.post('/location', (req, res) => {

        let token = req.body.token;
        let newCity = req.body.formData.newCity;
        let newState = req.body.formData.newState;
        let newCountry = req.body.formData.newCountry;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                //3.  Save new data to user's record in database
                console.log('user found', user);
                user.city = newCity;
                user.state = newState;
                user.country = newCountry;
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else if (!err) {
                        console.log("User's new location has been saved.");

                        //User's new location has been successfuly saved.
                        //4.  Send new JWT back to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({
                                success: true,
                                msg: 'New Location Saved',
                                token: token
                            });
                        });
                    }
                });
            });
        });
    });

    //Client requests to change user's password
    router.post('/password', (req, res) => {

        let token = req.body.token;
        let oldPassword = req.body.formData.oldPassword;
        let newPassword = req.body.formData.newPassword;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                // 3.  Check oldPassword from formData against hash stored in DB before updating password
                bcrypt.compare(oldPassword, user.password, (err, isValid) => {
                    if (err) {
                        console.log(err);
                    }
                    if (!isValid) {
                        res.json({
                            success: false,
                            msg: 'Invalid password, please re-enter old password'
                        });
                    } else if (isValid) {
                        //4.  Hash new password
                        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                            if (err) {
                                console.log(err);
                            }
                            user.password = hash;
                            user.save((err) => {
                                if (err) {
                                    console.log(err);
                                } else if (!err) {
                                    console.log("User's new password has been saved.");

                                    //User's new location has been successfuly saved.
                                    //5.  Send new JWT back to client
                                    jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        res.json({
                                            success: true,
                                            msg: 'New Password Saved',
                                            token: token
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
    });

    //Client requests to add game to user's record
    router.post('/add_game', (req, res) => {
        var token = req.body.token;
        var game = req.body.game;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {

            if (err) {
                console.log(err);
            }

            //2.  Save a record of this game to the game collection
            let newGame = new Game({
                title: game.title,
                cover: game.cover,
                platform: game.platform,
                owner: payload.user.username,
                available: true
            });

            newGame.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('A record for ' + game.title + ' has been added to the game collection.');
                }


                Game.findOne({
                    title: game.title,
                    cover: game.cover,
                    platform: game.platform,
                    owner: payload.user.username
                }, (err, game) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('find', game);
                    //2.  Find user's record according to username from JWT payload
                    User.findOne({ username: payload.user.username }, (err, user) => {
                        if (err) {
                            console.log(err);
                        }

                        user.games.push(game);
                        user.save((err) => {
                            if (err) {
                                console.log(err);
                            } else if (!err) {
                                console.log("User's new game has been saved.");

                                //5.  Send new JWT back to client so that UI will display new data.
                                jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.json({
                                        success: true,
                                        msg: 'New Game Added',
                                        token: token
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });
    });

    //Client requests to delete game from user's record
    router.post('/delete_game', (req, res) => {
        var token = req.body.token;
        var game = req.body.game;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            //2.  Find this game in game collection and delete it.
            Game.findOneAndRemove({ _id: game._id }, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log(game.title + ' has been removed from game collection.');
            });

            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                for (let i = 0; i < user.games.length; i++) {
                    if (user.games[i]._id.toString() === game._id) {
                        user.games.splice(i, 1);
                    }
                }

                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else if (!err) {
                        console.log(game.title + " has been deleted.");

                        //User's game has been successfuly deleted.
                        //5.  Send new JWT back to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({
                                success: true,
                                msg: 'Game deleted',
                                token: token
                            });
                        });
                    }
                });
            });
        });
    });

    //Client requests to get public userdata for profile page
    router.get('/profile/*', (req, res) => {
        let username = req.params['0'];

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            res.json(user);
        });
    });

    //Client requests to get trade data for username in parameter
    router.get('/get_trade_data', (req, res) => {
        let username = req.query.username;

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            let tradeData = {
                username: username,
                incoming: user.incoming,
                outgoing: user.outgoing,
                active: user.active,
                history: user.history
            }
            res.json(tradeData);
        });
    });

    //Client requests to trade with another user
    router.post('/trade_request', (req, res) => {
        console.log(req.body);
        let initiator = req.body.initiator;
        let game = req.body.game;

        let newTrade = {
            initiator: initiator,
            game: game,
            game2: null,
            date: new Date()
        }

        console.log(newTrade);

        //Create an outoing trade request for initiator
        User.findOne({ username: initiator }, (err, user) => {
            if (err) {
                console.log(err);
            }
            user.outgoing.push(newTrade);

            //Add record to history array
            user.history.push({
                date: new Date(),
                msg: 'You sent a trade request to ' + game.owner + '.'
            });

            user.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
            //Create an incoming trade requests for owner
            User.findOne({ username: game.owner }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                user.incoming.push(newTrade);
                //Add record to history array
                user.history.push({
                    date: new Date(),
                    msg: initiator + ' requested to trade with you.'
                });
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json({
                        success: true,
                        msg: 'Trade request sent'
                    });
                });
            });
        });
    });

    //Client requests to deny an incoming trade request
    router.post('/deny_trade_request', (req, res) => {

        //Delete this trade request from initiator's outgoing trade requests
        //Delete this trade request from game owner's incoming trade requests
        console.log(req.body);
        let initiator = req.body.initiator;
        let game = req.body.game;

        User.findOne({ username: game.owner }, (err, user) => {
            if (err) {
                console.log(err);
            }

            //Remove from game owner's incoming trade requests
            for (var i = 0; i < user.incoming.length; i++) {
                if (user.incoming[i].game._id === game._id) {
                    user.incoming.splice(i, 1);
                }
            }

            //Add record to history array
            user.history.push({
                date: new Date(),
                msg: 'Denied trade request with ' + initiator + '.'
            });

            user.save((err) => {
                if (err) {
                    console.log(err);
                }

                //Find initiator's record. Remove outgoing trade request
                User.findOne({ username: initiator }, (err, user) => {

                    for (var i = 0; i < user.outgoing.length; i++) {
                        if (user.outgoing[i].game._id === game._id) {
                            user.outgoing.splice(i, 1);
                        }
                    }

                    //Add record to history array
                    user.history.push({
                        date: new Date(),
                        msg: game.owner + ' denied your trade request.'
                    });

                    user.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.json({
                            success: true,
                            msg: 'Denied trade request with ' + initiator + '.'
                        });
                    });
                });
            });
        });
    });

    router.post('/accept_trade_request', (req, res) => {
        console.log(req.body);
        let initiator = req.body.initiator;
        let game = req.body.game;
        let game2 = req.body.game2;

        //This is the object that will be saved to game.owner and game2.owner's active trades
        let trade = {
            date: new Date(),
            game: game,
            game2: game2
        }

        //Set game.available = false so that it no longer shows up on home page
        Game.findOne({ _id: game._id }, (err, data) => {
            if (err) {
                console.log(err);
            }
            data.available = false;
            data.save((err) => {
                if (err) {
                    console.log(err);
                }
                console.log('Availability for ' + data.title + ' has been set to false');
            });
        });

        //Set game2.available = false so that it no longer shows up on home page
        Game.findOne({ _id: game2._id }, (err, data) => {
            if (err) {
                console.log(err);
            }
            data.available = false;
            data.save((err) => {
                if (err) {
                    console.log(err);
                }
                console.log('Availability for ' + data.title + ' has been set to false');
            });
        });

        //Remove trade request from game.owner's incoming trades
        User.findOne({ username: game.owner }, (err, data) => {
            if (err) {
                console.log(err);
            }
            let query = JSON.stringify(game._id);

            for (let i = 0; i < data.incoming.length; i++) {
                let id = JSON.stringify(data.incoming[i].game._id);

                if (id === query) {
                    console.log('INCOMING GAME FOUND');
                    data.incoming.splice(i, 1);

                    data.active.push(trade);
                    data.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('reached');
                            User.findOne({ username: game2.owner }, (err, data2) => {
                                if (err) {
                                    console.log(err);
                                }
                                let query = JSON.stringify(game._id);

                                for (let i = 0; i < data2.outgoing.length; i++) {
                                    let id = JSON.stringify(data2.outgoing[i].game._id);

                                    if (id === query) {
                                        console.log('INCOMING GAME FOUND');
                                        data2.outgoing.splice(i, 1);

                                        data2.active.push(trade);
                                        data2.save((err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                res.json({
                                                    success: true,
                                                    msg: 'Saved to active trades'
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    //Client requests to cancel an outgoing trade request
    router.post('/cancel_trade_request', (req, res) => {

        //Delete outgoing trade request for initiator
        //Delete incoming trade request for game owner
        let initiator = req.body.initiator;
        let game = req.body.game;


        // //Find initiator's record and remove this trade request from username's outgoing array
        User.findOne({ username: initiator }, (err, user) => {
            for (var i = 0; i < user.outgoing.length; i++) {
                if (user.outgoing[i].game._id === game._id) {
                    user.outgoing.splice(i, 1);
                }
            }

            user.save((err) => {
                if (err) {
                    console.log(err);
                }

                //Find gameOwner's record and remove this trade request from gameOwner's incoming array
                User.findOne({ username: game.owner }, (err, user) => {

                    for (var i = 0; i < user.incoming.length; i++) {
                        if (user.incoming[i].game._id === game._id) {
                            user.incoming.splice(i, 1);
                        }
                    }

                    user.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.json({
                            successs: true,
                            msg: 'Trade request canceled'
                        });
                    });
                });
            });
        });
    });

    router.post('/mark_returned', (req, res) => {
        let key = req.body.key;
        let trade = req.body.trade;

        let otherKey = '';
        switch (key) {
            case 'game': otherKey = 'game2'; break;
            case 'game2': otherKey = 'game'; break;
        }

        let game_id = trade[key]._id;
        let game2_id = trade[otherKey]._id;

        if (trade[otherKey + 'Returned']) {
            //Delete this trade from both users' active arrays.            
            User.findOne({ username: trade[key].owner }).exec()

                //Find this trade in this user's 'active' array.  
                .then(function (user) {
                    for (let i = 0; i < user.active.length; i++) {
                        if (JSON.stringify(user.active[i]) === JSON.stringify(trade)) {

                            user.active.splice(i, 1);
                        }
                    }
                    user.save();
                    return User.findOne({ username: trade[otherKey].owner }).exec();
                })

                .then(function (user2) {
                    for (let i = 0; i < user2.active.length; i++) {
                        if (JSON.stringify(user2.active[i]) === JSON.stringify(trade)) {

                            user2.active.splice(i, 1);
                        }
                    }
                    user2.save();
                    return Game.findOne({ '_id': trade[key]['_id'] }).exec();
                })

                .then(function (game) {

                    game.available = true;
                    game.save();
                    return;
                })

                .then(function () {
                    res.json({
                        success: true,
                        msg: 'Both games have been returned.'
                    });
                })

                .catch(error => { console.log('Error:', error.message); });

        } else if (!trade[otherKey + 'Returned']) {
            //Set this game to show as 'returned' for both users' active arrays.

            User.findOne({ username: trade[key].owner }).exec()

                //Find this trade in this user's 'active' array.  
                .then(function (user) {
                    for (let i = 0; i < user.active.length; i++) {

                        if (JSON.stringify(user.active[i][key]) === JSON.stringify(trade[key])) {
                            trade[key.toString() + 'Returned'] = true;
                            user.active.splice(i, 1, trade);
                        }
                    }
                    user.save();
                    return User.findOne({ username: trade[otherKey].owner }).exec();
                })

                .then(function (user2) {
                    for (let i = 0; i < user2.active.length; i++) {
                        if (JSON.stringify(user2.active[i][key]) === JSON.stringify(trade[key])) {
                            trade[key.toString() + 'Returned'] = true;
                            user2.active.splice(i, 1, trade);
                        }
                    }
                    user2.save();
                    return Game.findOne({ _id: trade[key]['_id'] });
                })

                .then(function (game) {

                    game.available = true;
                    game.save();
                    return;
                })

                .then(function () {
                    res.json({
                        success: true,
                        msg: 'Game saved as returned.'
                    });
                })

                .catch(error => { console.log('Error:', error.message); });
        }

    });

    router.get('/get_cover_url', (req, res) => {
        let gameOwner = req.query.gameOwner;
        let gameName = req.query.gameName;

        Game.findOne({
            title: gameName,
            owner: gameOwner
        }, (err, game) => {
            if (err) {
                console.log(err);
            }
            res.json(game);
        })
    });

    router.post('/select_game_for_trade', (req, res) => {
        console.log(req.body.tradeRequest);
        let token = req.body.token;

        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            console.log(payload);
            let username = payload.user.username;

            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                console.log(user.incoming);

                for (let i = 0; i < user.incoming.length; i++) {
                    let tradeRequestOnFile = JSON.stringify(user.incoming[i]);
                    let tradeRequestFromClient = JSON.stringify(req.body.tradeRequest);

                    if (tradeRequestOnFile === tradeRequestFromClient) {
                        console.log('Trade request located');

                        let tradeRequest = user.incoming[i];
                        tradeRequest.game2 = req.body.game;
                        //This is a work-around because I wans't able to directly modify the 
                        //nested object
                        user.incoming.splice(i, 1, tradeRequest);

                        user.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({
                                success: true,
                                msg: 'Selection has been saved'
                            });
                        });

                    }
                }

            });


        });
    });

    return router;
}

//----------------Promises example---------------------------

// function enrollStudent(req, res, next) {
//     var student;

//     //Load the user
//     Student.findById(req.body.studentId).exec()

//     //Capture student and load the course 
//     .then(function(studentFromDb){
//       student = studentFromDb
//       return Course.findById(req.body.courseId).exec();
//     })

//     //Check if there are available seats in the course
//     .then(function(course){
//       if(course.isSeatAvailable()){
//         //Enroll student into the course
//         course.enrolledStudents.push(student.id);
//         return course;
//       } else {
//         //throw an error
//         throw new Error('No seats available');
//       }
//     })

//     //Save the course
//     .then(function(course){
//       return course.save();
//     })

//     //Send the response back
//     .then(function(course){
//       return res.json({message : 'Enrollment successful'})
//     });

//     //Catch all errors and call the error handler;
//     .then(null, next);

//   }