const mongoose = require("mongoose");
const fs = require('fs');

const {SERVER_URL_PLACEHOLDER} = require('../utils/constants');

const potwSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true,
        set: function (filePath) {
            this._previousFilePath = this.filePath;
            return filePath;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Workaround for deleting previous file if it was change during an update.
 * During 'update' this refers to Query and not a document itelf so previous value
 * of a path is not available
 **/
potwSchema.pre("save", function(next) {
    let document = this;
    if (document._previousFilePath && document.isModified('filePath')) {
        fs.unlink(document._previousFilePath, (error) => {
            error
                ? console.error(`Failed to delete file ${document.filePath}`)
                : console.log(`Deleted file ${document.filePath}`);
        })
    }
    next();
});

potwSchema.virtual('previousPath')
    .set(function(lon) { this.longitude = lon });

potwSchema.virtual('photoUrl')
    .get(function() { return `${SERVER_URL_PLACEHOLDER}/${this.fileName}` });

potwSchema.virtual('id')
    .get(function() { return this._id });

potwSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    }
});

const Potw = mongoose.model("Potw", potwSchema);

module.exports = Potw;