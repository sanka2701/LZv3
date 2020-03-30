const express = require('express');
const router = express.Router();
const { convertToArray } = require('../utils/helpers');
const authe = require('../middleware/authentication');
const autho = require('../middleware/authorization');
const {ROLES} = require('../utils/constants');
const RequestProcessingError = require('../error/definition');
const {
    getRequestData,
    getUserToken,
    getCredentials,
    attachToken,
    saveUser,
    getAllUsers,
    deleteUser,
    updateUser,
    attachUpdateData,
    fetchUser,
    findByCredentials,
} = require('../controlers/user.controler');

const reply = request => users => {
    request.status(200).send({ users });
};

const replyWithToken = request => ({ user, token }) => {
    request.status(200).send({ user, token });
};

const processError = ( response, error) => {
    if(error instanceof RequestProcessingError) {
        response.status(400).send({ error: error.message });
    } else {
        response.status(500).send();
        throw error
    }
};

/**
 * Register
 */
router.post('/users', (request, response) => {
    getRequestData(request)
        .then(saveUser)
        .then(attachToken)
        .then(replyWithToken(response))
        .catch((error) => processError(response, error));
});

/**
 * Login
 */
router.post('/users/login', (request, response) => {
    getCredentials(request)
        .then(findByCredentials)
        .then(attachToken)
        .then(replyWithToken(response))
        .catch((error) => processError(response, error));
});

/**
 * Revisit the page
 */
router.get('/users/me', authe, autho(ROLES.USER), (request, response) => {
    getUserToken(request)
        .then(replyWithToken(response))
        .catch(error => processError( response, error ));
});

router.get('/users/:id', authe, autho(ROLES.USER), (request, response) => {
    const { id } = request.params;
    fetchUser({ id })
        .then(convertToArray)
        .then(reply(response))
        .catch( error => {
            processError( response, error)
        });
});

router.put('/users/:id', authe, autho(ROLES.USER), (request, response) => {
    getRequestData( request )
        .then(attachUpdateData(fetchUser))
        .then(updateUser)
        .then(saveUser)
        .then(convertToArray)
        .then(reply(response))
        .catch( error => {
            processError( response, error)
        });
});

router.get('/users', (request, response) => {
    getAllUsers()
        .then(reply(response))
        .catch(error => processError( response, error ));
});

//todo delete

module.exports = router;