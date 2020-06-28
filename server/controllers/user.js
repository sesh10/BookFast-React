const User = require('../model/user');
const { normalizeErrors } = require('../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function (req, res) {
    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
    }

    User.findOne({email}, function (err, user) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        
        if (!user) {
            return res.status(422).send({errors: [{title: 'Invalid user', detail: 'User does not exist'}]});
        }

        if (user.hasSamePassword(password)) {
            // return JWT Token
            const token = jwt.sign({
                userId: user.id,
                username: user.username
                },
                config.SECRET, {expiresIn: '1h'}
            );

            return res.json(token);
        }
        else {
            return res.status(422).send({errors: [{title: 'Invalid data', detail: 'Invalid email or password'}]});
        }
    });
}


exports.register = function (req, res) {
    const { username, password, email, passwordConfirmation } = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Password is not same'}]});
    }

    User.findOne({email}, function (err, existingUser) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (existingUser) {
            return res.status(422).send({errors: [{title: 'Invalid email', detail: 'User with email already exists'}]});
        }

        const user = new User({
            username, email, password
        });

        user.save(function (err) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            res.json({'registered': true})
        });
    });
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);
        User.findById(user.userId, function (err, user) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                return notAuthorized(res);
            }
        })
    }
    else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login to get access'}]});
}