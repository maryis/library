const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const guard = require('../services/guard');
const Transaction = require('../models/Transaction.model');


// buy  -  auth
router.post('/',guard, (req, res) => {

    trans = req.body;
    const {id} = req.params;

    if (trans.trans_time && trans.customer&&trans.books) {
        let newTrans = new Transaction(req.body);
        console.log(newTrans);
        newTrans
            .save()
            .then(trans => {
                res.json({
                    status: true,
                    data: trans,
                    msg: 'Register Transaction successful'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'Error registering Transaction'
                });
                throw new Error(err);
            })
    } else {
        res.status(400).send({
            status: false,
            msg: 'incorrect data'
        });
    }

});

module.exports = router;