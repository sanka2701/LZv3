const mongoose = require("mongoose");
const Event = require('./Event.model');
const RequestProcessingError = require('../error/definition');

const PlaceSchema = new mongoose.Schema({
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

PlaceSchema.pre('remove', function (next) {
    var { id } = this;
    Event.find( { tags: mongoose.Types.ObjectId(id) }, (error, events) => {
        if(events && events.length) {
            let error = new RequestProcessingError(`Tag can't be deleted. It is referenced in Events ${events.map(e => e.id)}`, 400 );
            next(error);
        } else {
            next()
        }
    });
});

PlaceSchema.virtual('lon')
    .get(function() { return this.longitude })
    .set(function(lon) { this.longitude = lon });

PlaceSchema.virtual('lat')
    .get(function() { return this.latitude })
    .set(function(lat) { this.latitude = lat });

PlaceSchema.virtual('id')
    .get(function() { return this._id });

PlaceSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.longitude;
        delete ret.latitude;
        delete ret._id;
        delete ret.__v;
    }
});

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;