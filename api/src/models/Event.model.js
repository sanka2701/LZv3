const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    files: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

eventSchema.virtual('id')
    .get(function() { return this._id });

eventSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;