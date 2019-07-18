module.exports = (app) => {
    
    app.use('/login', require('./login.route'));
    app.use('/user', require('./user.route'));
    app.use('/book', require('./book.route'));
    app.use('/buy', require('./transaction.route'));

}