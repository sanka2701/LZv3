const Place = require('../models/Place.model');
const RequestProcessingError = require('../error/definition');

const getRequestData = ( request ) => {
    return new Promise(( resolve, reject) => {
        let data = {
            id: request.params.id,
            ...request.body
        };
        if(request.user) {
            data.ownerId = request.user.id
        }

        resolve( data )
    })
};

const fetchPlace = ({ id }) => {
    return new Promise( (resolve, reject) => {
        Place.findById(id)
            .orFail(() => {
                reject(new RequestProcessingError(`Place with id ${id} does not exists`, 404))
            })
            .exec((error, place ) => {
                !!error
                    ? reject(new RequestProcessingError(`Place with id ${id} does not exists`, 404))
                    : resolve( place )
            })
    })
};

const fetchAllPlaces = () => {
    return Place.find()
};

const updatePlace = (  updateData ) => {
    return Place.findOneAndUpdate({_id: updateData.id}, updateData, {new: true});
};

const savePlace = ( data ) => {
    return Place.create( data )
};

const deletePlace= ( place ) => {
    return place.remove()
};

module.exports = {
    getRequestData, fetchPlace, fetchAllPlaces, updatePlace, savePlace, deletePlace
};