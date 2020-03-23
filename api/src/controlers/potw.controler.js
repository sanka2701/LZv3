const express = require('express');
const crypto = require("crypto");
const formidable = require('formidable');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const Potw = require('../models/Potw.model');
const {ROLES} = require('../utils/constants');

const router = express.Router();

const processIncomingForm = (request) => {
    return new Promise((resolve, reject) => {
        var formData = {};
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
            .on('file', (name, file) => {
                formData.filePath = file.path;
                formData.fileName = file.name;
            })
            .on('error', (error) => {
                reject(error)
            })
            .on('end', () => {
                resolve(formData)
            });
    });
};

router.post('/potw', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then((formData) => {
            let payload = { ...formData, ownerId: request.user.id };
            Potw.create( payload )
                .then((potw) => {
                    response.status(201).send({ photos: [potw] });
                })
                .catch((error) => {
                    //todo: delete just uploaded file
                    response.status(400).send({ error });
                });
        })
        .catch((error) => {
            response.status(500).send({error});
        })
});

router.put('/potw/:id', authe, autho(ROLES.ADMIN), async (request, response) => {
    processIncomingForm(request)
        .then((formData) => {
            const { id } = request.params;
            let payload = { ...formData, ownerId: request.user.id };
            Potw.findOne( {_id: id}, payload, {new: true} )
                .then((potw) => {
                    Object.assign(potw, formData);
                    potw.save()
                        .then(updated => {
                            response.status(201).send({ photos: [updated] })
                        })
                })
                .catch((error) => {
                    //todo: delete just uploaded file
                    response.status(400).send({ error });
                });
        })
        .catch((error) => {
            response.status(500).send({error});
        });
});

router.get('/potw', (request, response) => {
    Potw.find()
        .exec()
        .then( photos => {
            response.status(200).send({ photos });
        })
        .catch( error => {
            response.status(400).send({error});
        });
});

router.get('/potw/:id', async (request, response) => {
    const { id } = request.params;
    Potw.findOne({ _id: id })
        .orFail(() => {
            throw new Error (`Photo with id ${id} does not exists`);
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