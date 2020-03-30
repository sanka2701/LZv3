const File = require('../models/File.model');

module.exports.saveThumbnail = (formData) => {
    return formData.thumbnailFile
        ? new Promise((resolve, reject) => {
            File.create(formData.thumbnailFile).then(
                thumbnailFile => {
                    resolve ({ ...formData, thumbnailFile })
                },
                error => {
                    //todo: delete just uploaded files
                    reject(error)
                });
        })
        : formData;
};

module.exports.saveContentFiles = (formData) => {
    return formData.contentFiles
        ? new Promise((resolve, reject) => {
            File.create(formData.contentFiles).then(
                contentFiles => {
                    resolve ({ ...formData, contentFiles })
                },
                error => {
                    // todo delete files
                    reject(error)
                });
        })
        : formData;
};

module.exports.resolveContentFiles = (content, newFiles, oldFiles, ) => {
    newFiles = newFiles || [];
    oldFiles = oldFiles || [];
    content = content   || '';

    var result = oldFiles.concat(newFiles).filter(
        (file) => content.includes(file.pattern)
    );
    oldFiles.diff(result).forEach(file => file.remove());


    return result;
};
