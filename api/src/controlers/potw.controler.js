const crypto = require("crypto");
const formidable = require('formidable');
const Potw = require('../models/Potw.model');
const RequestProcessingError = require('../error/definition');

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
            .on('file', (key, {path, name}) => {
                formData.thumbnailFile = {path, name}
            })
            .on('error', (error) => {
                reject(error)
            })
            .on('end', () => {
                resolve({
                    id: request.params.id,
                    ownerId: request.user.id,
                    ...formData
                })
            });
    });
};

/**
 * Returns either searched Document during GET operation or searched document and data representing
 * the update upon this Document. It is so to enable chaining this function in both search and update process.
 */
const fetchPhoto = (updateData) => {
    return new Promise( (resolve, reject) => {
        Potw.findById( updateData.id )
            .populate('thumbnailFile')
            .orFail(() => {
                let error = new RequestProcessingError(`Photo with id ${updateData.id} does not exists`, 404);
                reject(error);
            })
            .exec((error, photo ) => {
                !!error
                    ? reject(new RequestProcessingError(error.message, 400))
                    : resolve({ photo, updateData })
            })
    });
};

const fetchAllPhotos = () => {
    return Potw.find()
        .populate('thumbnailFile')
};

const updatePhoto = ({photo, updateData}) => {
    Object.assign(photo, updateData);
    return photo
};

const savePhoto = (data) => {
    return Potw.create( data )
};

const deletePhoto= ({ photo }) => {
    return photo.remove()
};

module.exports = {
    savePhoto, deletePhoto, updatePhoto, fetchPhoto, fetchAllPhotos, processIncomingForm
};