const mongoose = require("mongoose");
const {SERVER_URL_PLACEHOLDER} = require('../utils/constants');

const EventSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
    }],
    content: {
        type: String,
        required: true
    },
    placeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Place'
    },
    thumbnailFile: {
        type: mongoose.Schema.ObjectId,
        ref: 'File',
        required: true,
        set: function (file) {
            this._previousThumnailFile = this.thumbnailFile;
            return file;
        }
    },
    contentFiles: [{
        type: mongoose.Schema.ObjectId,
        ref: 'File',
        // set: function (files) {
        //     this._previousContentFiles = this.contentFiles.length
        //         ? this.contentFiles
        //         : null;
        //     return files;
        // }
    }],
    startDate: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endDate: {
        type: String,
    },
    endTime: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

EventSchema.pre("save", function(next) {
    let document = this;
    if (document._previousThumnailFile && document.isModified('thumbnailFile')) {
        document._previousThumnailFile.remove();
    }
    /**
      * This functionality is more elegant here but when setting up a contentFiles
      * the setter is not called for an empty array. If the content files previously contained
      * some data they will be leaked. Ex Event contained some pcitures previously but after edit pictures were removed
      * from the content. The original files wont be deleted
      */
    // if (document._previousContentFiles && document.isModified('contentFiles')) {
    //     document._previousContentFiles.diff(document.contentFiles)
    //         .forEach(file => file.remove());
    // }

    next();
});

EventSchema.pre("remove", function(next) {
    let document = this;
    document.contentFiles.forEach( file => file.remove());
    document.thumbnailFile.remove();
    next();
});

EventSchema.virtual('thumbnail')
    .get(function() { return `${SERVER_URL_PLACEHOLDER}/${this.thumbnailFile.name}` });

EventSchema.virtual('id')
    .get(function() { return this._id });

EventSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.thumbnailFile;
        delete ret.contentFiles;
        delete ret._id;
        delete ret.__v;
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;