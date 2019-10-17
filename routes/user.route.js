const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const guard = require('../services/guard');
const adminGuard = require('../services/adminguard');
const User = require('../models/User.model');

// list - no Auth
router.get('/', (req, res) => {
    User
        .find({})
        .then(users => {
            res.json({
                status: true,
                data: users,
                msg: 'Listing users success'
            });
        })
        .catch(err => {
            res.status(500).send({
                status:false,
                msg:'error listing users'
            })
        })
});

// get one - no Auth
router.get('/:id', (req, res) => {
    const {id} = req.params;
    User
        .findOne({username:id})
        .then(user => {
            if (user) {
                res.json({
                    status: true,
                    data: user,
                    msg: 'user fetched'
                });
            } else {
                res.status(400).send({
                    status: false,
                    msg: "user not found"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                msg:"problem in fetching user : "+  err.toString()//
            })
        })
});

// add user - admin
router.post('/', adminGuard, (req, res) => {
    const {username, password} = req.body;
    if (username && password) {
        User
            .findOne({username})
            .then(user => {
                if (!user) {
                    let newUser = new User(req.body);
                    newUser
                        .save()
                        .then(user => {
                            res.json({
                                status: true,
                                data: user,
                                msg: 'Register user successful'
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                status: false,
                                msg: 'Error registering User'
                            });
                            throw new Error(err);
                        })
                } else {
                    res.status(409).send({
                        status: false,
                        msg: 'user already exist'
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

//change user   - admin
router.put('/:id', adminGuard, (req, res) => {

    user = req.body;
    const {id} = req.params;

    if (id) {
        User.findOneAndUpdate({username: id}, user, {new: false})
            .then(u => {
                res.json({
                    status: true,
                    data: u,
                    msg: 'Change user successful'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: err.toString() //'Change user problem'
                });
            })
    } else {
        res.status(500).send({
            status: false,
            msg: 'incorrect data'
        });
    }
});

//delete  - admin
router.delete('/:id', adminGuard, (req, res) => {

    const {id} = req.params;

    User.findOneAndDelete(id)
        .then(u => {
                res.json({
                    status: true,
                    data: u,
                    msg: 'User deleted'
                });
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                msg: 'delete user problem'
            });
        });

});

module.exports = router;