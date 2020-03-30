const Tag = require('../models/Tag.model');
const RequestProcessingError = require('../error/definition');

const getRequestData = ( request ) => {
    return new Promise(( resolve, reject) => {
        resolve ({
            id: request.params.id,
            ...request.body
        })
    })
};

const fetchTag = ({ id }) => {
    return new Promise( (resolve, reject) => {
        Tag.findById( id )
            .orFail(() => {
                reject(new RequestProcessingError(`Tag with id ${id} does not exists`, 404))
            })
            .exec((error, event ) => {
                !!error
                    ? reject(new RequestProcessingError(error.message, 400))
                    : resolve(event)
            })
    })
};

const fetchAllTags = () => {
    return Tag.find()
};

const updateTag = (  updateData ) => {
    return Tag.findOneAndUpdate({_id: updateData.id}, updateData, {new: true});
};

const saveTag = ( data ) => {
    return Tag.create( data )
};

const deleteTag= ( tag ) => {
    return tag.remove()
};

module.exports = {
    getRequestData, fetchTag, fetchAllTags, updateTag, saveTag, deleteTag
};