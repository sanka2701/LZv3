const crypto = require("crypto");
const formidable = require('formidable');
const Event = require('../models/Event.model');
const { resolveContentFiles } = require('../utils/formContent');
const RequestProcessingError = require('../error/definition');

const { SERVER_URL_PLACEHOLDER } = require('../utils/constants');

//todo: this could be unified with processing of the Potw
const processIncomingForm = (request) => {
    return new Promise((resolve, reject) => {
        var formData = {
            contentFiles: []
        };
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
            .on('file', (key, { name, path }) => {
                const image = { name, path, pattern: key, };
                key === 'thumbnail'
                    ? formData.thumbnailFile = image
                    : formData.contentFiles.push(image)
            })
            .on('error', (error) => {
                reject(error)
            })
            .on('end', () => {
                formData.contentFiles.forEach(file => {
                    let url = `${SERVER_URL_PLACEHOLDER}/${file.name}`;
                    formData.content = formData.content.replace(file.pattern, url);
                    file.pattern = url;
                });

                resolve({
                    id: request.params.id,
                    ownerId: request.user.id,
                    ...formData
                })
            });
    });
};

// todo: this can be unified with other contreolers attachUpdateData functions - just add a key under which the data should ba paased on
const attachUpdateData = fetchEvent => ( updateData ) => {
    return new Promise( (resolve, reject) => {
        fetchEvent({ id: updateData.id })
            .then(
                event => resolve({ event, updateData }),
                error => reject(new Error(error.message))
            )
    })
};

const fetchEvent = ({ id }) => {
    return new Promise( (resolve, reject) => {
        Event.findById( id )
            .populate('thumbnailFile')
            .populate('contentFiles')
            .orFail(() => {
                let error = new RequestProcessingError(
                    `Event with id ${id} does not exists`,
                    404
                );
                reject(error);
            })
            .exec((error, event ) => {
                !!error
                    ? reject(new RequestProcessingError(error.message, 400))
                    : resolve( event )
            })
    });
};

// const fetchEvent = (updateData) => {
//     return new Promise( (resolve, reject) => {
//         Event.findById( updateData.id )
//             .populate('thumbnailFile')
//             .populate('contentFiles')
//             .orFail(() => {
//                 let error = new RequestProcessingError(
//                     `Event with id ${updateData.id} does not exists`,
//                     404
//                 );
//                 reject(error);
//             })
//             .exec((error, event ) => {
//                 !!error
//                     ? reject(new RequestProcessingError(error.message, 400))
//                     : resolve({ event, updateData })
//             })
//     });
// };

const getTags = ({ tags, ...data }) => {
    const array = tags.split(',');
    return { tags: array, ...data }
};

const fetchAll = () => {
    return Event.find()
        .populate('thumbnailFile')
        .populate('contentFiles')
};

const updateEvent = ({event, updateData}) => {
    updateData.contentFiles = resolveContentFiles(updateData.content, updateData.contentFiles, event.contentFiles);
    Object.assign(event, updateData);
    return event
};

const saveEvent = (data) => {
    return Event.create( data )
};

const deleteEvent= ({ event }) => {
    return event.remove()
};

module.exports = {
    processIncomingForm, getTags, fetchEvent, fetchAll, updateEvent, saveEvent, deleteEvent, attachUpdateData
};