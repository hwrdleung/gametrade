const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = (router) => {

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
                                console.log(token);
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
                console.log('user found', user);
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
                                console.log(token);
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
                                console.log(token);
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

                console.log(user);

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
                            console.log('hash', hash);
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
                                            console.log(token);
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
        console.log(req.body.gameData.name);
        var token = req.body.token;
        var gameData = req.body.gameData;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            console.log('payload', payload);

            if (err) {
                console.log(err);
            }

            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                user.games.push(gameData.name);
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else if (!err) {
                        console.log("User's new game has been added.");

                        //User's new game has been successfuly added.
                        //5.  Send new JWT back to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(token);
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

     //Client requests to delete game from user's record
     router.post('/delete_game', (req, res) => {
        var token = req.body.token;
        var gameName = req.body.gameName;

        //1.  Verify web token
        jwt.verify(token, 'secret', (err, payload) => {
            if (err) {
                console.log(err);
            }
            console.log('payload', payload);
            //2.  Find user's record according to username from JWT payload
            User.findOne({ username: payload.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }

                let i = user.games.indexOf(gameName);        
                user.games.splice(i, 1);
                console.log(user.games);

                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else if (!err) {
                        console.log(gameName + " has been deleted.");

                        //User's game has been successfuly deleted.
                        //5.  Send new JWT back to client
                        jwt.sign({ user: user }, 'secret', { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                console.log(token);
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
    return router;
}