const express = require('express');
const router = express.Router();

const { convertToArray } = require('../utils/helpers');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const { saveThumbnail } = require('../utils/formContent');
const RequestProcessingError = require('../error/definition');
const {
    savePhoto,
    deletePhoto,
    updatePhoto,
    fetchPhoto,
    fetchAllPhotos,
    processIncomingForm
} = require('../controlers/potw.controler');

const {ROLES} = require('../utils/constants');

const reply = ( response, code ) => (data) => {
    response.status(code).send({ photos: data })
};

const processError = ( response, error) => {
    if(error instanceof RequestProcessingError) {
        response.status(400).send({error});
    } else {
        response.status(500).send();
        throw error
    }
};

router.post('/potw', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then(saveThumbnail)
        .then(savePhoto)
        .then(convertToArray)
        .then(reply(response, 201))
        .catch((error) => {
            processError(response, error);
        });
});

router.put('/potw/:id', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then(saveThumbnail)
        .then(fetchPhoto)
        .then(updatePhoto)
        .then(savePhoto)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch((error) => {
            processError(response, error);
        });
});

router.delete('/potw/:id', authe, autho(ROLES.ADMIN), (request, response) => {
    const { id } = request.params;
    fetchPhoto({id})
        .then(deletePhoto)
        .then(reply(response, 202))
        .catch( error  => {
            processError(response, error);
        });
});

router.get('/potw/:id', (request, response) => {
    const { id } = request.params;
    fetchPhoto({id})
        .then(convertToArray)
        .then(reply(response, 200))
        .catch( error  => {
            processError(response, error);
        });
});

router.get('/potw', (request, response) => {
    fetchAllPhotos()
        .then(reply(response, 200))
        .catch( error  => {
            processError(response, error);
        });
});

module.exports = router;