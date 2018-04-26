const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = (router) => {

    //POST request from registration form
    router.post('/register', (req, res) => {

        var newUser = new User({
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        //Todo: Check database for existing username/email
        User.find({username: req.body.username, email: req.body.email}, (err, data)=>{
            if(err){
                console.log(err);
            }
            console.log('Record found', data);
        });

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

    return router;
}