const mongoose = require("mongoose");
const Event = require('./Event.model');
const RequestProcessingError = require('../error/definition');

const TagSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
});

TagSchema.pre('remove', function (next) {
    var { id } = this;

    Event.find( { tags: mongoose.Types.ObjectId(id) }, (error, events) => {
        if(events.length) {
            next(
                new RequestProcessingError(
                    `Tag can't be deleted. It is referenced in Events ${events.map(e => e.id)}`,
                    400
                )
            );
        } else {
            next()
        }
    });
});

TagSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;