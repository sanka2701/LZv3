const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
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

//todo: prevention of deletion if its used in event

placeSchema.virtual('lon')
    .get(function() { return this.longitude })
    .set(function(lon) { this.longitude = lon });

placeSchema.virtual('lat')
    .get(function() { return this.latitude })
    .set(function(lat) { this.latitude = lat });

placeSchema.virtual('id')
    .get(function() { return this._id });

placeSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.longitude;
        delete ret.latitude;
        delete ret._id;
        delete ret.__v;
    }
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;