const express = require('express');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const {ROLES} = require('../utils/constants');
const Place = require('../models/Place.model');

const router = express.Router();

router.post('/places', authe, autho(ROLES.USER), async (req, res) => {
    try {
        let payload = { ...req.body, ownerId: req.user.id };
        const place = new Place(payload);
        await place.save();
        res.status(201).send({ places: [place] })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/places/:id', authe, autho(ROLES.USER), async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(201).send({ places: [place] });
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/places/:id', authe, autho(ROLES.ADMIN), (req, res) => {
    const { id } = req.params;
    Place.findOneAndDelete({ _id : id }).then(() => {
        // res.redirect('/places');
        res.status(200).send();
    })
});

router.get('/places', async (req, res) => {
    const places = await Place.find();
    res.json({ places });
});

router.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findOne({_id: id});
        res.status(201).send({ places: [place] });
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;