const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error ;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password, 12),then(hashedpw =>{
        const user = new User({
            email: email,
            password: hashedpw,
            name: name
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message: 'User Created!', userId: result._id });
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500 ;
        }
        next(err);        
    });
};

exports.login = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loadUser;
    User.findOne({email : email})
        .then(user => {
            if(!user){
                const error = new Error('User with this email could not be fouud')
                error.statusCode = 401;
                throw error;
            }
            loadUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if(!isEqual) {
                const error = new Error('Wrong Password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
            {
                email: loadUser.email,
                userId: loadUser._id.toString()
            },
            'somesupersecretsecret',
            {expiresIn: '1h'}
            );
            res.status(200).json({token: token, userId: loadUser._id.toString() })
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500 ;
            }
            next(err);   
        });
};