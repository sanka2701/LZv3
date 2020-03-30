const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authe = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if(decoded) {
                User.findOne({ _id: decoded._id }, '-password')
                    .orFail(() => {
                        throw new Error ('Not authorized to access this resource');
                    })
                    .then((user) => {
                        req.user = user;
                        req.token = token;
                        next()
                    })
                    .catch((error) => {
                        res.status(500).send({ error })
                    })
            } else {
                throw new Error (error.message || 'Not authorized to access this resource');
            }
        })
    } catch (err) {
        res.status(401).send({error: err.message})
    }
};

module.exports = authe;