const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const {ROLES} = require('../utils/constants');

router.post('/users', async (req, res) => {
    // Create a new user
    console.log('Incoming user registration request', req.body);
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/users/me', authe, autho(ROLES.USER), async(req, res) => {
    const {user, token} = req;
    res.send({ user, token })
});

// todo: get by id
// todo: update

module.exports = router;