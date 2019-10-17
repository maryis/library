const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');


//login  -- no auth --create token
router.post('/', (req, res) => {//check pass
    
    const { username, password } = req.body;


    if (username && password){
        User
            .findOne({username})
            .then(user => {
                if (user){
                    
                    // Compare Password
                    console.log(user.password)
                    user.comparePassword(password, function(err, isMatch){
                        if (err) throw new Error(err);

                        if (!err && isMatch){

                            let header = {
                                expiresIn : '6h',
                                issuer: 'lib-app',
                                audience: 'users'
                            };

                            let payload = { //or claim
                                username : user.username,
                                isAdmin: user.isAdmin
                            }

                            jwt.sign(payload, 'myKey', header, function(err, token){
                                if (!err){
                                    res.json({
                                        status: true,
                                        msg: 'Login successful',
                                        data: token
                                    });
                                }
                            });

                        } else {
                            res.json({
                                status: false,
                                msg: 'User/Password incorrect'
                            });
                        }

                    });
                    
                } else {
                    res.status(404).send({
                        status: false,
                        msg: 'user not found'
                    });
                }
            })

    } else {
        res.status(500).send({
            status: false,
            msg: 'incorrect data'
        });
    }

});


module.exports = router;