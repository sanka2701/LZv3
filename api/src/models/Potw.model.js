const mongoose = require("mongoose");
const fs = require('fs');

const {SERVER_URL_PLACEHOLDER} = require('../utils/constants');

const PotwSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnailFile: {
        type: mongoose.Schema.ObjectId,
        ref: 'File',
        required: true,
        set: function (file) {
            this._previousFile = this.thumbnailFile;
            return file;
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
PotwSchema.pre("save", function(next) {
    let document = this;
    if (document._previousFile && document.isModified('thumbnailFile')) {
        document._previousFile.remove()
    }
    next();
});

PotwSchema.pre("remove", function(next) {
    let document = this;
    document.thumbnailFile.remove();
    next();
});

PotwSchema.virtual('photoUrl')
    .get(function() { return `${SERVER_URL_PLACEHOLDER}/${this.thumbnailFile.name}` });

PotwSchema.virtual('id')
    .get(function() { return this._id });

PotwSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    }
});

const Potw = mongoose.model("Potw", PotwSchema);

module.exports = Potw;