const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
});

tagSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;