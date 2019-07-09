const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.headers.auth){
        return res.status(403).send({
            status: false,
            msg: 'Auth failed'
        });
    } else {
        let token = req.headers.auth;
        jwt.verify(token, 'TEST', function(err, user) {
            if (!err){
                req.user = user;
                next();
            }
        });
    }
}