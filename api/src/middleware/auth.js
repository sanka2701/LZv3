const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) {
            res.status(500).send({ error })
        }
        if(decoded) {
            User.findOne({ _id: data._id })
                .then((user) => {
                    if(!user) {
                        res.status(401).send({ error: 'Not authorized to access this resource' })
                    }
                    req.user = user;
                    req.token = token;
                    next()
                })
                .catch((error) => {
                    res.status(500).send({ error })
                })
        }
    });
};

module.exports = auth;