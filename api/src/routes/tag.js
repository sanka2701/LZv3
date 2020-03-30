const express = require('express');
const { convertToArray } = require('../utils/helpers');
const {
    getRequestData,
    fetchTag,
    fetchAllTags,
    updateTag,
    saveTag,
    deleteTag
} = require('../controlers/tag.controler');
const RequestProcessingError = require('../error/definition');

const router = express.Router();

const reply = ( response, code ) => (data) => {
    response.status(code).send({ tags: data })
};

const processError = ( response, error) => {
    if(error instanceof RequestProcessingError) {
        response.status(400).send({ error: error.message });
    } else {
        response.status(500).send({ error: error.message });
        throw error
    }
};

router.post('/tags', ( request, response ) => {
    getRequestData(request)
        .then(saveTag)
        .then(convertToArray)
        .then(reply(response, 201))
        .catch( error => {
            processError( response, error)
        });
});

router.put('/tags/:id', ( request, response ) => {
    getRequestData(request)
        .then(updateTag)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

router.delete('/tags/:id', ( request, response ) => {
    getRequestData(request)
        .then(fetchTag)
        .then(deleteTag)
        .then(convertToArray)
        .then(reply(response, 202))
        .catch( error => {
            processError( response, error)
        });
});

router.get('/tags', ( request, response ) => {
    fetchAllTags()
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

router.get('/tags/:id', ( request, response ) => {
    getRequestData(request)
        .then(fetchTag)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch( error => {
            processError( response, error)
        });
});

module.exports = router;
