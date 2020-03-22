const express = require('express');
const Tag = require('../models/Tag.model');

const router = express.Router();

router.post('/tags', async (req, res) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).send({ tags: [tag] })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/tags/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(201).send({ tags: [tag] });
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/tags', async (req, res) => {
    const tags = await Tag.find();
    res.json({ tags });
});

router.get('/tags/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findOne({_id: id});
        res.status(201).send({ tags: [tag] });
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    Tag.findOneAndDelete({ _id : id }).then(() => {
        res.status(200).send();
    })
});

module.exports = router;