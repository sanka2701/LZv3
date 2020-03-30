const User = require('../models/User.model');
const RequestProcessingError = require('../error/definition');

const getRequestData = ( request ) => {
    return new Promise(( resolve, reject) => {
        resolve ({
            id: request.params.id,
            ...request.body
        })
    })
};

const getUserToken = (request) => new Promise(( resolve, reject ) => {
    try {
        const { user, token } = request;
        resolve ({ user, token })
    } catch (e) {
        reject (new RequestProcessingError(`Missing user or token`), 400)
    }
});

const getCredentials = ( request ) => new Promise(( resolve, reject ) => {
    try {
        const { username, password } = request.body;
        resolve ({ username, password })
    } catch (e) {
        reject (new RequestProcessingError(`Missing credentials`), 400)
    }
});

const attachToken = user => {
    const token = user.generateAuthToken();
    return { user, token};
};

const saveUser = ( data ) => User.create( data );

const getAllUsers = () => User.find();

const deleteUser = user => user.remove();

const updateUser =  ({ user, updateData }) => {
    Object.assign(user, updateData);
    return user
};

const attachUpdateData = fetchUser => ( updateData ) => {
    return new Promise( (resolve, reject) => {
        fetchUser({ id: updateData.id })
            .then(user  => resolve({ user, updateData }))
    })
};

const fetchUser = ({ id }) => {
    return new Promise( (resolve, reject) => {
        User.findById( id )
            .orFail(() => {
                reject(new RequestProcessingError(`User with id ${id} does not exists`, 404))
            })
            .exec((error, event ) => {
                !!error
                    ? reject(new RequestProcessingError(error.message, 400))
                    : resolve(event)
            })
    })
};

module.exports = {
    findByCredentials: User.findByCredentials,
    getRequestData,
    getUserToken,
    getCredentials,
    attachToken,
    saveUser,
    getAllUsers,
    deleteUser,
    updateUser,
    attachUpdateData,
    fetchUser
};