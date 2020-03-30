const express = require('express');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const { convertToArray } = require('../utils/helpers');
const { ROLES } = require('../utils/constants');
const RequestProcessingError = require('../error/definition');
const {
    getRequestData,
    fetchPlace,
    fetchAllPlaces,
    updatePlace,
    savePlace,
    deletePlace,
} = require('../controlers/place.controler');

const router = express.Router();

const reply = ( response, code ) => (data) => {
    response.status(code).send({ places: data })
};

const processError = ( response, error) => {
    if(error instanceof RequestProcessingError) {
        response.status(400).send({ error: error.message });
    } else {
        response.status(500).send();
        throw error
    }
};

router.post('/places', authe, autho(ROLES.USER), (request, response) => {
    getRequestData(request)
        .then(savePlace)
        .then(convertToArray)
        .then(reply(response, 201))
        .catch( error => {
            processError( response, error)
        });
});

router.put('/places/:id', authe, autho(ROLES.USER), (request, response) => {
    getRequestData(request)
        .then(updatePlace)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

router.delete('/places/:id', authe, autho(ROLES.ADMIN), (request, response) => {
    getRequestData(request)
        .then(fetchPlace)
        .then(deletePlace)
        .then(convertToArray)
        .then(reply(response, 202))
        .catch( error => {
            processError( response, error)
        });
});

router.get('/places', (request, response) => {
    fetchAllPlaces()
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

router.get('/places/:id', (request, response) => {
    getRequestData(request)
        .then(fetchPlace)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

module.exports = router;