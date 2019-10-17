const jwt = require('jsonwebtoken');

module.exports = ( req, res, next) => {

    if (!req.headers.auth) {
        return res.status(401).send({
            status: false,
            msg: 'Not Valid User'
        });
    } else {
        let token = req.headers.auth;

        jwt.verify(token, 'myKey', function (err, decoded) { //decoded is payload
            if (!err) {
                   req.user = decoded;
                    next();

            }
            else
                return res.status(401).send({
                    status: false,
                    msg: 'Not Valid User'
                });

        });
    }
}