/**
 * Created by Administrator on 11/18/2016.
 */
var jwt = require('jwt-simple');

exports.verifyUser = function (req, res, next) {
    //var token = req.body.token || req.query.token || req.headers['userToken'];
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'naskoSecret');

    if (!payload.sub) {
        return res.status(401).send({message: 'Authentication failed'});
    }

    if (token) {
        req.decoded = payload;
        return next();

    }

};

exports.verifyOrdinaryUser = function (req, res, next) {
    var userToken = req.body.token || req.query.token || req.headers['token'];
    console.log(userToken);
    var payload = jwt.decode(userToken, 'naskoSecret');
    if (userToken) {
        req.decoded = payload;
        return next();

    }
    else {
        //If no token return Err
        var err = new Error('No token provided!');
        err.status = 401;
        return next(err);
    }
};

