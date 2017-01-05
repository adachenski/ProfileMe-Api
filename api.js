/**
 * Created by Administrator on 11/13/2016.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('./models/User');
var verify = require('./routes/verify');
var userSettings = require('./routes/userSettingRouter');
var messages = require('./routes/messageRouter');
var app = express();

var port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});


var loginStrategy = new LocalStrategy({usernameField: 'email'},
    function (email, password, done) {
        var serchUser = {email: email};
        User.findOne(serchUser, function (err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, {message: "Wrong email/password"});
            }

            user.comparePasswords(password, function (err, isMatch) {
                if (err) return done(err);

                if (!isMatch) {
                    return done(null, false, {message: "passwords not mach"});
                }
                return done(null, user);
            });
        });

    });

var registerStrategy = new LocalStrategy({usernameField: 'email'}, function (email, password, done) {


    var serachUser = {
        email: email
    };
    User.findOne(serachUser, function (err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, false, {
                message: 'E-mail already exists!'
            });
        }


        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {

            done(null, newUser);

        });

    });


});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);


app.use(function (req, res, next) {

    //headers that enable corse
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var jobs = [
    'Nasko',
    'Rally',
    'html',
    'Angular'
];
app.use('/custom', userSettings);

app.use('/messages',messages);

app.get('/jobs',verify.verifyUser, function (req, res, next) {

    res.json(jobs);
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    createSendToken(req.user, res);

});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'naskoSecret');

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};

//mongoose.connect('mongodb://localhost/ProfileMe3');
mongoose.connect('mongodb://adachenski:fbd78f5321@ds141118.mlab.com:41118/profileme');
//console.log(jwt.encode('hi','secret'));

app.listen(port, function () {
    console.log('Api listening on port: ', port);
});