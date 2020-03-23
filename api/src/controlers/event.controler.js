const express = require('express');
const crypto = require("crypto");
const fs = require('fs');
const formidable = require('formidable');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const Event = require('../models/Event.model');
const {ROLES} = require('../utils/constants');

const router = express.Router();

const processIncomingForm = (request) => {
    return new Promise((resolve, reject) => {
        var formData = {
            files: {}
        };
        new formidable.IncomingForm().parse(request)
            .on('field', (name, value) => {
                formData[name] = value;
            })
            .on('fileBegin', (name, file) => {
                let extension = file.name.split('.').pop();
                let hashName  =  crypto.randomBytes(20).toString('hex');
                file.name = `${hashName}.${extension}`;
                file.path = `${process.env.UPLOADS_DIR}/${file.name}`;
            })
            .on('file', (key, file) => {
                const { path, name } = file;
                formData.files[key] = { path, name };
            })
            .on('error', (error) => {
                reject(error)
            })
            .on('end', () => {
                resolve(formData)
            });
    });
};

router.post('/events', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then((formData) => {
            let payload = { ...formData, ownerId: request.user.id };
            // Event.create( payload )
            //     .then((potw) => {
            //         response.status(201).send({ photos: [potw] });
            //     })
            //     .catch((error) => {
            //         //todo: delete just uploaded file
            //         response.status(400).send({ error });
            //     });
            response.status(201).send();
        })
        .catch((error) => {
            response.status(500).send({error});
        })
});

router.get('/events', (request, response) => {
    Event.find()
        .then(events => {
            response.status(200).send({ photos: events });
        })
        .catch( error => {
            response.status(400).send({error});
        });
});

router.get('/events/:id', async (request, response) => {
    const { id } = request.params;
    Event.findOne({ _id: id })
        .orFail(() => {
            throw new Error (`Event with id ${id} does not exists`);
        })
        .exec()
        .then( photo => {
            response.status(200).send({ photos : [ photo ] });
        })
        .catch( error => {
            response.status(400).send(error);
        });
});

//todo: delete

module.exports = router;