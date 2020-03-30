const express = require('express');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const { ROLES } = require('../utils/constants');
const { convertToArray } = require('../utils/helpers');
const { saveThumbnail, saveContentFiles } = require('../utils/formContent');
const RequestProcessingError = require('../error/definition');
const {
    processIncomingForm,
    getTags,
    fetchEvent,
    fetchAll,
    updateEvent,
    saveEvent,
    deleteEvent,
    attachUpdateData,
} = require('../controlers/event.controler');

const router = express.Router();

const reply = ( response, code ) => (data) => {
    response.status(code).send({ events: data })
};

const processError = ( response, error) => {
    if(error instanceof RequestProcessingError) {
        response.status(400).send({error});
    } else {
        response.status(500).send();
        throw error
    }
};

router.post('/events', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then(getTags)
        .then(saveThumbnail)
        .then(saveContentFiles)
        .then(saveEvent)
        .then(convertToArray)
        .then(reply(response, 201))
        .catch(error => {
            processError(response, error);
        })
});

router.put('/events/:id', authe, autho(ROLES.ADMIN), (request, response) => {
    processIncomingForm(request)
        .then(getTags)
        .then(saveThumbnail)
        .then(saveContentFiles)
        .then(attachUpdateData(fetchEvent))
        .then(updateEvent)
        .then(saveEvent)
        .then(convertToArray)
        .then(reply(response, 200))
        .catch(error => {
            processError(response, error);
        })
});

router.delete('/events/:id', authe, autho(ROLES.ADMIN), (request, response) => {
    const { id } = request.params;
    fetchEvent({ id })
        .then(deleteEvent)
        .then(reply(response, 202))
        .catch(error => {
            processError(response, error);
        })
});

router.get('/events', (request, response) => {
    const { id } = request.params;
    fetchAll({ id })
        .then(reply(response, 200))
        .catch(error => {
            processError(response, error);
        })
});

router.get('/events/:id', (request, response) => {
    const { id } = request.params;
    fetchEvent({ id })
        .then(convertToArray)
        .then(reply(response, 200))
        .catch(error => {
            processError(response, error);
        })
});

module.exports = router;