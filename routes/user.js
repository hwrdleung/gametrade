const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = (router) => {

    //POST request from login form
    router.post('/login', (req, res) => {

        //Get user record from DB
        User.find({ username: req.body.username }, (err, user) => {
            //user is an array of objects
            if (err) {
                console.log(err);
            }

            if (user.length === 0) { //No record with this username
                res.json({
                    success: false,
                    msg: 'User not found.'
                });
            } else if (user.length > 0) { //User found. 
                //Check password from login form against user's stored hash
                bcrypt.compare(req.body.password, user[0].password, (err, isValid) => {
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
                        jwt.sign({ user: user }, 'secret', { expiresIn: '5h' }, (err, token) => {
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

    return router;
}