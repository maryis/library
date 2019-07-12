module.exports = (app) => {
    
    app.use('/login', require('./login.route'));
    app.use('/user', require('./user.route'));
    app.use('/book', require('./book.route'));
    // app.use('/service', require('./service.route'));
    // app.use('/search', require('./search.route'));

}