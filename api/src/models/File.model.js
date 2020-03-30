const mongoose = require("mongoose");
const fs = require('fs');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
    pattern: {
        type: String
    }
});

FileSchema.pre("remove", function(next) {
    let path = this.path;
    fs.unlink(path, (err) => {
        err
            ? console.error(`Failure during deletion of file ${path}`)
            : console.log(`${path} was deleted`);
    });
    next();
});

module.exports = mongoose.model("File", FileSchema);