const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RequestProcessingError = require('../error/definition');

const {ROLES} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    default: ROLES.USER
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre('save', function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 8, function(error, hash) {
            error && next( error );
            user.password = hash;
            next();
        })
    } else {
        next();
    }
});

userSchema.methods.generateAuthToken = function() {
    const user = this;
    return jwt.sign({_id: user._id}, process.env.JWT_KEY);
};

userSchema.statics.findByCredentials = async ({ username, password }) => {
    const user = await User.findOne({ username} ).orFail(() => {
        throw new RequestProcessingError('Invalid username', 400)
    });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new RequestProcessingError('Invalid password', 400)
    }
    return user
};

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
