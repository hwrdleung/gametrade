const User = require('../models/user');
const Game = require('../models/game');
const jwt = require('jsonwebtoken');
const bcrypt = require('../index.js').bcrypt

module.exports = (router) => {

    router.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let currentUser;

        console.log('Login request for', username);
        User.findOne({ username: username }).exec()
            //Check password
            .then(function (user) {
                if (!user) {
                    console.log('User not found.  Sending error message to client.');
                    res.json({
                        success: false,
                        msg: 'User not found.'
                    });
                    throw 'End promise chain';
                } else if (user) {
                    console.log('User found.  Authenticating password.');
                    currentUser = user;
                    return bcrypt.compare(password, user.password);
                }
            })

            //Generate token
            .then(function (isValid) {
                if (!isValid) {
                    console.log('Invalid password.  Sending error message to client.');
                    res.json({
                        success: false,
                        msg: 'Invalid password.'
                    });
                    throw 'End promise chain';
                } else if (isValid) {
                    console.log('Password accepted.');
                    return jwt.sign({ user: currentUser }, 'secret', { expiresIn: '3h' });
                }
            })

            //Send token to client
            .then(function (token) {
                console.log('Authentication successful. \nSending token to client for user session. Duration: 3h.');
                return res.json({
                    success: true,
                    msg: 'Password accepted',
                    token: token
                });
            })

            .catch(error => { console.log('Error:', error.message); });
    });

    router.post('/register', (req, res) => {
        //Data validation is handled client-side.
        console.log('Data received for new user registration.');

        User.findOne({ username: req.body.username }).exec()
            //Check for existing account with this username
            .then(function (user) {
                console.log('Checking for existing account with this username.');
                if (user) {
                    res.json({
                        success: false,
                        msg: 'This username is already in use.'
                    })
                    throw 'End promise chain';
                }
                console.log('Username available.');
                return User.findOne({ email: req.body.email });
            })

            //Check for existing account with this email address
            .then(function (email) {
                console.log('Checking for existing account with this email address.');
                if (email) {
                    res.json({
                        success: false,
                        msg: 'This email address has already been used to create an account.'
                    })
                    throw 'End promise chain';
                }
                console.log('Email address available.');
                return bcrypt.hash(req.body.password, saltRounds);
            })

            //If passed checks, then hash password and save new user.
            .then(function (hash) {
                console.log('Registering new user.');
                var newUser = new User({
                    first: req.body.first,
                    last: req.body.last,
                    email: req.body.email,
                    username: req.body.username,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    password: hash,
                    profile: {
                        'display name': true,
                        'display email': true,
                        'picture': 1,
                        'bio': 'I like turtles',
                        'reviews': []
                    }
                });
                return newUser.save();
            })

            //Send success message back to client
            .then(function (user) {
                console.log('New user registration successful.  ' + user.username + ' is now registered.  Sending success message to client.');
                res.json({
                    success: true,
                    msg: 'Registration successful.'
                });
                return;
            })

            .catch(error => { console.log('Error:', error.message); });
    });


    router.post('/delete_account', (req, res) => {

        let token = req.body.token;
        let password = req.body.password;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            //Retrieve user data
            User.findOne({ _id: payload.user._id }).exec()

                //Verify password
                .then(function (user) {
                    console.log('Found document for ' + payload.user.username + '.  Verifying password.');
                    return bcrypt.compare(password, user.password);
                })

                //Delete data for this user from the 'user' collection in the database
                .then(function (isValid) {
                    if (!isValid) {
                        //Invalid password.
                        console.log('Invalid password.  Sending error message to client.');
                        res.json({
                            success: false,
                            msg: 'Invalid password.'
                        });
                        throw 'End promise chain';
                    } else if (isValid) {
                        //Password accepted.  Delete account
                        console.log('Password accepted.  Deleting user account for ' + payload.user.username + '.');
                        return User.findOneAndRemove({ _id: payload.user._id })
                    }
                })

                //Delete all games owned by this user from the 'game' collection in the database
                .then(function () {
                    Game.find({ owner: payload.user.username }, (err, games) => {
                        games.forEach(function (game) {
                            return game.remove();
                        });

                        res.json({
                            success: true,
                            msg: 'Account has been deleted.',
                        });
                    })
                })
                .catch(error => { console.log('Error:', error.message); });
        });
    });

    //Change email address
    router.post('/email', (req, res) => {

        let token = req.body.token;
        let newEmail = req.body.formData.email;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            if (payload) {
                //Find record for user specified in token
                User.findOne({ username: payload.user.username }).exec()
                    //Save new data to user's record in database
                    .then(function (user) {
                        console.log('Saving new email address for ' + payload.user.username + '.');
                        user.email = newEmail;
                        user.save();
                        console.log('Email address for ' + payload.user.username + ' has been updated.');

                        return jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
                    })

                    //Send new token with updated data back to client
                    .then(function (token) {
                        console.log('Sending new token back to client.');
                        return res.json({
                            success: true,
                            msg: 'New Email Address has been Saved',
                            token: token
                        });
                    })
                    .catch(error => { console.log('Error:', error.message); });
            }
        });
    });

    //Client request to change user's location
    router.post('/location', (req, res) => {

        let token = req.body.token;
        let newCity = req.body.formData.newCity;
        let newState = req.body.formData.newState;
        let newCountry = req.body.formData.newCountry;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            //Find record for user specified in token
            User.findOne({ username: payload.user.username }).exec()

                .then(function (user) {
                    //Save new data to user's record in database
                    user.city = newCity;
                    user.state = newState;
                    user.country = newCountry;
                    user.save();
                    console.log('Location for ' + payload.user.username + ' has been updated.');

                    return jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
                })

                //Send new token with updated data back to client
                .then(function (token) {
                    return res.json({
                        success: true,
                        msg: 'New Location Saved',
                        token: token
                    });
                })
                .catch(error => { console.log('Error:', error.message); });
        });
    });


    //Client requests to change user's password
    router.post('/password', (req, res) => {

        let token = req.body.token;
        let oldPassword = req.body.formData.oldPassword;
        let newPassword = req.body.formData.password;
        let currentUser;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            //Find record for user specified in token
            User.findOne({ username: payload.user.username }).exec()
                //Check old password
                .then(function (user) {
                    console.log('Validating password.');
                    currentUser = user;
                    return bcrypt.compare(oldPassword, user.password);
                })

                //Hash new password
                .then(function (isValid) {
                    if (!isValid) {
                        console.log('Invalid password.  Sending error message back to client.');
                        res.json({
                            success: false,
                            msg: 'Invalid password, please re-enter old password'
                        });
                        throw 'End promise chain';
                    } else if (isValid) {
                        console.log('Password accepted.  Saving new password for ' + payload.user.username + '.');
                        return bcrypt.hash(newPassword, saltRounds);
                    }
                })

                //Save new password
                .then(function (hash) {
                    currentUser.password = hash;
                    currentUser.save();
                    console.log('Password for ' + payload.user.username + ' has been updated.');

                    return jwt.sign({ user: currentUser }, 'secret', { expiresIn: '1h' });
                })

                //Send updated token to client
                .then(function (token) {
                    console.log('Sending new token to client.');
                    res.json({
                        success: true,
                        msg: 'New Password Saved',
                        token: token
                    });
                    return
                })
                .catch(error => { console.log('Error:', error.message); });
        });
    });

    //Client requests to add game to user's record
    router.post('/add_game', (req, res) => {
        var token = req.body.token;
        var game = req.body.game;
        var newGameWithId;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {

            if (err) {
                console.log(err);
            }

            let newGame = new Game({
                title: game.title,
                cover: game.cover,
                platform: game.platform,
                owner: payload.user.username,
                available: true
            });

            //Save a record of this game to the 'games' collection
            newGame.save()
                .then(function (newGame) {
                    console.log('A game has been added to the games collection: ' + newGame.title + ' owned by ' + newGame.owner);
                    return Game.findOne({
                        title: game.title,
                        cover: game.cover,
                        platform: game.platform,
                        owner: payload.user.username
                    });
                })

                //Find game in database.  It should now have an id.
                .then(function (game) {
                    newGameWithId = game;

                    return User.findOne({ username: payload.user.username });
                })

                //Save a copy of new game with id to user's 'games' array
                .then(function (user) {
                    user.games.push(newGameWithId);
                    return user.save();
                })

                .then(function (user) {
                    console.log("A new game has been added to " + user.username + "'s 'games' array: " + newGameWithId.title);
                    return jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
                })

                //Send success message and updated token back to client
                .then(function (token) {
                    res.json({
                        success: true,
                        msg: 'New Game Added',
                        token: token
                    });
                })
                .catch(error => { console.log('Error:', error.message); });
        });
    });


    router.post('/delete_game', (req, res) => {
        let token = req.body.token;
        let game = req.body.game;
        let currentUser;


        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            if (payload) {
                //Delete this game from 'games' collection in database
                currentUser = payload.user.username;
                console.log(game);


                Game.findOneAndRemove({ _id: game._id }).exec()
                    .then(function () {
                        console.log('Deleting game from "games" collection in database: ', game._id);
                        return User.findOne({ username: currentUser });
                    })

                    //Delete this game from this user's document
                    .then(function (user) {
                        console.log(user.games[0]);
                        for (let i = 0; i < user.games.length; i++) {
                            if (user.games[i]._id.toString() === game._id) {
                                user.games.splice(i, 1);
                            }
                        }
                        user.save();
                        return jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
                    })

                    //Send updated token back to client
                    .then(function (token) {
                        console.log('Sending new token back to client.');
                        res.json({
                            success: true,
                            msg: 'Game deleted',
                            token: token
                        });
                    })
                    .catch(error => { console.log('Error:', error.message); });
            }
        });
    });

    //Client requests to get public userdata for profile page
    router.get('/profile/*', (req, res) => {
        let username = req.params['0'];

        User.findOne({ username: username }).exec()
            .then(function (user) {
                res.json(user);
            })
            .catch(error => { console.log('Error:', error.message); });
    });

    //Client requests to get trade data for a specified user
    router.get('/get_trade_data', (req, res) => {
        let username = req.query.username;

        User.findOne({ username: username }).exec()
            .then(function (user) {
                let tradeData = {
                    username: username,
                    incoming: user.incoming,
                    outgoing: user.outgoing,
                    active: user.active,
                    history: user.history
                }
                res.json(tradeData);
            })
            .catch(error => { console.log('Error:', error.message); });
    });

    //Client requests to trade with another user
    router.post('/trade_request', (req, res) => {

        let initiator = req.body.initiator;
        let game = req.body.game;

        let newTrade = {
            initiator: initiator,
            game: game,
            game2: null,
            date: new Date()
        }

        console.log(initiator + ' initiated a trade request with ' + game.owner + ' for ' + game.title + ' on ' + game.platform);

        User.findOne({ username: initiator }).exec()
            //Save trade data to trade initiator's outgoing trade requests
            .then(function (user) {
                user.outgoing.push(newTrade);
                //Add entry to trade history log
                user.history.push({
                    date: new Date(),
                    msg: 'You sent a trade request to ' + game.owner + ' for ' + game.title + '.'
                });

                user.save();
                return User.findOne({ username: game.owner });
            })

            //Save trade data to game owner's incoming trade requests
            .then(function (user) {
                user.incoming.push(newTrade);
                //Add entry to trade history log
                user.history.push({
                    date: new Date(),
                    msg: initiator + ' requested to trade with you for your game, ' + newTrade.game.title
                });

                user.save();
                return;
            })

            //Send success message back to client
            .then(function () {
                console.log('Saved new trade request to "outgoing trade requests" for ' + initiator);
                console.log('Saved new trade request to "incoming trade requests" for ' + game.owner);
                res.json({
                    success: true,
                    msg: 'Trade request sent'
                });
            })
            .catch(error => { console.log('Error:', error.message); });
    });


    //Client requests to deny an incoming trade request
    router.post('/deny_trade_request', (req, res) => {

        let initiator = req.body.initiator;
        let game = req.body.game;

        console.log(game.owner + ' denied a trade request from ' + initiator + ' for ' + game.title + ' on ' + game.platform);

        User.findOne({ username: game.owner }).exec()
            //Delete trade data from game owner's incoming trade requests
            .then(function (user) {
                for (var i = 0; i < user.incoming.length; i++) {
                    if (user.incoming[i].game._id === game._id) {
                        user.incoming.splice(i, 1);
                    }
                }

                //Add entry to trade history log
                user.history.push({
                    date: new Date(),
                    msg: 'You denied a trade request from ' + initiator + ' for your ' + game.title + '.'
                });
                return user.save();
            })

            .then(function (user) {
                console.log('Removed new trade request from "incoming trade requests" for ' + game.owner);
                return User.findOne({ username: initiator });
            })

            //Delete trade data from initiator's outgoing trade requests
            .then(function (initiator) {
                for (var i = 0; i < initiator.outgoing.length; i++) {
                    if (initiator.outgoing[i].game._id === game._id) {
                        initiator.outgoing.splice(i, 1);
                    }
                }
                //Add record to history array
                initiator.history.push({
                    date: new Date(),
                    msg: game.owner + ' denied your trade request for ' + game.title + '.'
                });
                return initiator.save();
            })

            .then(function (user) {
                console.log('Removed new trade request from "outgoing trade requests" for ' + initiator);
                return;
            })

            //Send success message back to client
            .then(function () {
                return res.json({
                    success: true,
                    msg: 'Denied trade request with ' + initiator + '.'
                });
            })
            .catch(error => { console.log('Error:', error.message); });
    });


    router.post('/accept_trade_request', (req, res) => {

        let game = req.body.game;
        let game2 = req.body.game2;

        //This is the object that will be saved to game.owner and game2.owner's active trades
        let trade = {
            date: new Date(),
            game: game,
            game2: game2
        }

        Game.findOne({ _id: game._id }).exec()
            //Set available = false for game in 'games' collection 
            .then(function (data) {
                data.available = false;
                return data.save();
            })

            .then(function (data) {
                console.log('Availability has been set to false for ' + data.owner + ' ' + data.title);
                return Game.findOne({ _id: game2._id });
            })

            //Set available = false for game2 in 'games' collection 
            .then(function (data) {
                data.available = false;
                return data.save();
            })

            .then(function (data) {
                console.log('Availability has been set to false for ' + data.owner + ' ' + data.title);
                return User.findOne({ username: game.owner });
            })

            //Save trade to 'incoming trades' for game owner
            .then(function (gameOwner) {
                let query = JSON.stringify(game._id); ``

                for (let i = 0; i < gameOwner.incoming.length; i++) {
                    let id = JSON.stringify(gameOwner.incoming[i].game._id);

                    if (id === query) {
                        gameOwner.incoming.splice(i, 1);
                        gameOwner.active.push(trade);
                        gameOwner.history.push({
                            date: new Date(),
                            msg: 'You accepted a trade request from ' + game2.owner + '.  You are trading your ' + game.title + ' for ' + game2.owner + "'s " + game2.title
                        });
                        return gameOwner.save();
                    }
                }
            })

            .then(function (gameOwner) {
                console.log('A new trade has been saved to ' + gameOwner.username + "'s active trades.");
                return User.findOne({ username: game2.owner });
            })

            //Save trade data to 'incoming trades' for game2 owner
            .then(function (game2Owner) {
                let query = JSON.stringify(game._id);

                for (let i = 0; i < game2Owner.outgoing.length; i++) {
                    let id = JSON.stringify(game2Owner.outgoing[i].game._id);

                    if (id === query) {
                        game2Owner.outgoing.splice(i, 1);
                        game2Owner.active.push(trade);
                        game2Owner.history.push({
                            date: new Date(),
                            msg: game.owner + ' accepted your trade request.  You are trading your ' + game2.title + ' for ' + game.owner + "'s " + game.title
                        });
                        return game2Owner.save();
                    }
                }
            })

            .then(function (game2Owner) {
                console.log('A new trade has been saved to ' + game2Owner.username + "'s active trades.");
                return
            })

            //Send success message back to client
            .then(function () {
                res.json({
                    success: true,
                    msg: 'Saved to active trades'
                });
            })
            .catch(error => { console.log('Error:', error.message); });
    });



    //Client requests to cancel an outgoing trade request
    router.post('/cancel_trade_request', (req, res) => {

        let initiator = req.body.initiator;
        let game = req.body.game;

        User.findOne({ username: initiator }).exec()
            //Delete trade from initiator's outgoing trade requests
            .then(function (user) {
                for (var i = 0; i < user.outgoing.length; i++) {
                    if (user.outgoing[i].game._id === game._id) {
                        user.outgoing.splice(i, 1);
                        user.history.push({
                            date: new Date(),
                            msg: 'You canceled your trade request with ' + game.owner + ' for ' + game.title + '.'
                        });
                    }
                }
                return user.save();
            })

            .then(function (user) {
                console.log('A trade has been deleted from ' + initiator + "'s outgoing trade requests.");
                return User.findOne({ username: game.owner });
            })

            //Delete trade from game.owner's incoming trade requests
            .then(function (user) {
                for (var i = 0; i < user.incoming.length; i++) {
                    if (user.incoming[i].game._id === game._id) {
                        user.incoming.splice(i, 1);
                        user.history.push({
                            date: new Date(),
                            msg: initiator + ' canceled a trade request with you for ' + game.title + '.'
                        });
                    }
                }
                return user.save();
            })

            .then(function (user) {
                console.log('A trade has been deleted from ' + game.owner + "'s incoming trade requests.");
                return;
            })

            //Send success message back to client
            .then(function (user) {
                return res.json({
                    successs: true,
                    msg: 'Trade request canceled'
                });
            })
            .catch(error => { console.log('Error:', error.message); });
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
            //Trade is complete.  Delete this trade from both users' active trades
            User.findOne({ username: trade[key].owner }).exec()
                //Delete this trade from [key].owner's active trades 
                .then(function (user) {
                    for (let i = 0; i < user.active.length; i++) {
                        if (JSON.stringify(user.active[i]) === JSON.stringify(trade)) {
                            user.active.splice(i, 1);
                            user.history.push({
                                date: new Date(),
                                msg: trade[otherKey].owner + ' returned your game, ' + trade[key].title + '.'
                            });
                        }
                    }
                    return user.save();
                })

                .then(function (user) {
                    console.log('A trade has been deleted from ' + trade[key].owner + "'s active trades.");
                    return User.findOne({ username: trade[otherKey].owner });
                })

                //Delete this trade from [otherKey].owner's active trades
                .then(function (user2) {
                    for (let i = 0; i < user2.active.length; i++) {
                        if (JSON.stringify(user2.active[i]) === JSON.stringify(trade)) {
                            user2.active.splice(i, 1);
                            user2.history.push({
                                date: new Date(),
                                msg: 'You returned ' + trade[key].owner + "'s game, " + trade[key].title + '.'
                            });
                        }
                    }
                    return user2.save();
                })

                .then(function (user2) {
                    console.log('A trade has been deleted from ' + trade[otherKey].owner + "'s active trades.");
                    return Game.findOne({ '_id': trade[key]['_id'] });
                })

                //Set this game's availability to true in the 'games' collection
                .then(function (game) {
                    game.available = true;
                    return game.save();
                })

                .then(function () {
                    res.json({
                        success: true,
                        msg: 'Both games have been returned.'
                    });
                })
                .catch(error => { console.log('Error:', error.message); });

        } else if (!trade[otherKey + 'Returned']) {
            //Trade is not yet complete.  Indicate that this game has been returned in both users' active trades
            User.findOne({ username: trade[key].owner }).exec()
                //Set [key + 'Returned] = true in [key].owner's active trades
                .then(function (user) {
                    for (let i = 0; i < user.active.length; i++) {
                        if (JSON.stringify(user.active[i][key]) === JSON.stringify(trade[key])) {
                            trade[key.toString() + 'Returned'] = true;
                            user.active.splice(i, 1, trade);
                            user.history.push({
                                date: new Date(),
                                msg: trade[otherKey].owner + ' returned your game, ' + trade[key].title + '.'
                            });
                        }
                    }
                    return user.save();
                })

                .then(function (user) {
                    return User.findOne({ username: trade[otherKey].owner }).exec();
                })

                //Set [key + 'Returned] = true in [otherKey].owner's active trades
                .then(function (user2) {
                    for (let i = 0; i < user2.active.length; i++) {
                        if (JSON.stringify(user2.active[i][key]) === JSON.stringify(trade[key])) {
                            trade[key.toString() + 'Returned'] = true;
                            user2.active.splice(i, 1, trade);
                            user2.history.push({
                                date: new Date(),
                                msg: 'You returned ' + trade[key].owner + "'s game, " + trade[key].title + '.'
                            });
                        }
                    }
                    return user2.save();
                })

                .then(function (user2) {
                    return Game.findOne({ _id: trade[key]['_id'] });
                })

                //Set this game's availability to true in the 'games' collection
                .then(function (game) {
                    game.available = true;
                    return game.save();
                })

                //Send Success message back to client
                .then(function () {
                    res.json({
                        success: true,
                        msg: 'Game saved as returned.'
                    });
                })
                .catch(error => { console.log('Error:', error.message); });
        }
    });

    //TODO: check if i need this endpoint
    router.get('/get_cover_url', (req, res) => {
        let gameOwner = req.query.gameOwner;
        let gameName = req.query.gameName;

        Game.findOne({
            title: gameName,
            owner: gameOwner
        }).exec()

            .then(function (game) {
                res.json(game);
            })

            .catch(error => { console.log('Error:', error.message); });
    });

    router.post('/select_game_for_trade', (req, res) => {
        let token = req.body.token;
        let game = req.body.game;
        let tradeRequest = req.body.tradeRequest;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            let username = payload.user.username;

            //Save this game as 'game2' for this trade request
            User.findOne({ username: username }).exec()
                .then(function (user) {
                    for (let i = 0; i < user.incoming.length; i++) {
                        let tradeRequestOnFile = JSON.stringify(user.incoming[i]);
                        let tradeRequestFromClient = JSON.stringify(tradeRequest);

                        if (tradeRequestOnFile === tradeRequestFromClient) {
                            let tradeRequest = user.incoming[i];
                            tradeRequest.game2 = game;
                            user.incoming.splice(i, 1, tradeRequest);

                            return user.save();
                        }
                    }
                })

                //Send success message back to client
                .then(function () {
                    res.json({
                        success: true,
                        msg: 'Selection has been saved'
                    });
                })
                .catch(error => { console.log('Error:', error.message); });
        });
    });

    router.post('/edit_profile', (req, res) => {

        let token = req.body.token;
        let bio = req.body.formData.bio;
        let picture = req.body.formData.picture;
        let displayName = req.body.formData.displayName === 'Enable' ? true : false;
        let displayEmail = req.body.formData.displayEmail === 'Enable' ? true : false;

        console.log(displayName, displayEmail);

        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            let username = payload.user.username;

            User.findOne({ username: username }).exec()

                //Save updated profile data to user's document in db
                .then(function (user) {
                    user.profile['display name'] = displayName;
                    user.profile['display email'] = displayEmail;
                    user.profile['bio'] = bio;
                    user.profile['picture'] = picture;

                    return user.save();
                })

                //Create  JWT with updated data
                .then(function (user) {
                    console.log('Profile data updated for user: ' + username);
                    return jwt.sign({ user: user }, 'secret', { expiresIn: '1h' });
                })

                //Send success message and updated token back to client
                .then(function (token) {
                    console.log('Sending new token to client.');
                    res.json({
                        success: true,
                        msg: 'Profile changes have been saved for ' + username,
                        token: token
                    });
                    return
                })
                .catch(error => { console.log('Error:', error.message); });

        });
    });

    router.post('/post_review', (req, res) => {

        let token = req.body.token;
        let profile = req.body.formData.profile;
        let reviewBody = req.body.formData.reviewBody;
        let reviewer;

        //Verify token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }

            reviewer = payload.user.username;

            User.findOne({ username: profile }).exec()

                //Save new review to profile's document
                .then(function (user) {
                    user.profile.reviews.push({
                        date: new Date(),
                        reviewer: reviewer,
                        body: reviewBody
                    });
                    return user.save();
                })

                //Send success message back to client
                .then(function (user) {
                    console.log('A new review has been saved to ' + profile + "'s document.");
                    return res.json({
                        success: true,
                        msg: 'Review has been successfully saved'
                    });
                })
                .catch(error => { console.log('Error:', error.message); });
        });

    });


    return router;
}