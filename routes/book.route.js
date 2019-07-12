const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const guard = require('../services/guard');
const adminGuard = require('../services/adminguard');
const Book = require('../models/Book.model');

// list - no Auth
router.get('/', (req, res) => {
    Book
        .find({})
        .then(books => {
            res.json({
                status: true,
                data: books,
                msg: 'Listing books success'
            });
        })
        .catch(err => {
           res.status(500).send({
               status:false,
               msg:'error listing books'
           })
        })
});

// get one - no Auth
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Book
        .findById(id)
        .then(book => {
            if (book) {

                res.json({
                    status: true,
                    data: book,
                    msg: 'book fetched'
                });
            } else {
                res.status(400).send({
                    status: false,
                    msg: "book not found"
                })
            }

        })
        .catch(err => {
            res.status(500).send({
                status: false,
                msg: "problem in fetching book"
            })
        })
});

//get book avg rate   - no Auth
router.get('/getrate/:id',  (req, res) => {

    const {id} = req.params;

    Book.findById(id)
        .then(b => {
            let rate=0;
            let count=0;
            b.comments.forEach(c=>{
                count++;
                rate+=c.rate;
            });

            if(count>0){
                rate=rate/count;
            }
            res.json({
                status: true,
                data: {rate:rate},
                msg: ' successful calculation'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: flase,
                msg: 'get book info problem'
            });
        })

});

// add book - admin
router.post('/', adminGuard, (req, res) => {

    const {ISBN} = req.body;

    if (ISBN ) {
        Book
            .findOne({ISBN})
            .then(book => {
                if (!book) {
                    let newBook = new Book(req.body);
                    newBook
                        .save()
                        .then(book => {
                            res.json({
                                status: true,
                                data: book,
                                msg: 'Register book successful'
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                status: false,
                                msg: 'Error registering book'
                            });
                            throw new Error(err);
                        })
                } else {
                    res.status(409).send({
                        status: false,
                        msg: 'book already exist'
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

//change book(to add comment)   - Auth
router.put('/addcomment/:id', guard, (req, res) => {

    book = req.body;
    const {id} = req.params;

    if (!(book.ISBN || book.title||book.rented_quantity||book.total_quantity||book.authors)&& (book.comments)) {
        Book.findById(id)
            .then(b => {

                b.comments.forEach(c=>{
                    book.comments.push(c)
                })
                Book.updateOne(book,function (err,b) {
                    if(!err){
                        res.json({
                            status: true,
                            data: book,
                            msg: 'comment added successful'
                        });
                    }
                    else {
                        res.status(500).send({
                            status: false,
                            msg: 'Change book problem'});
                    }

                });

            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'Change book problem'
                });
            })
    } else {
        res.status(500).send({
            status: false,
            msg: 'incorrect data'
        });
    }
});

//change book(to add comment)   - Admin
router.put('/addauthor/:id', adminGuard(), (req, res) => {

    book = req.body;
    const {id} = req.params;

    if (!(book.ISBN || book.title||book.rented_quantity||book.total_quantity||book.comments)&& (book.authors)) {
        Book.findById(id)
            .then(b => {

                b.authors.forEach(a=>{
                    book.authors.push(a)
                })
                Book.updateOne(book,function (err,b) {
                    if(!err){
                        res.json({
                            status: true,
                            data: book,
                            msg: 'author added successful'
                        });
                    }
                    else {
                        res.status(500).send({
                            status: false,
                            msg: 'Change book problem'});
                    }

                });

            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'Change book problem'
                });
            })
    } else {
        res.status(500).send({
            status: false,
            msg: 'incorrect data'
        });
    }
});

//change book   - Admin
router.put('/:id', adminGuard, (req, res) => {

    book = req.body;
    const {id} = req.params;

    if (book.ISBN ) {
        Book.findByIdAndUpdate(id, book, {new: true})
            .then(b => {
                res.json({
                    status: true,
                    data: book,
                    msg: 'Change book successful'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'Change book problem'
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

    Book.findByIdAndDelete(id)
        .then(u => {
            res.json({
                status: true,
                data: u,
                msg: 'book deleted'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                msg: 'delete book problem'
            });
        });

});

module.exports = router;