const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pick = require('lodash').pick;

const UserSchema = new mongoose.Schema({
  googleId: String,
  username: {
    type: String,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.pre('save', function(next) {
  const user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else { next(); }
});

UserSchema.method.generateAuthToken =  async function() {
  const user = this;
  const access = "auth";
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET);
  user.tokens.push({access, token});
  try {
    await user.save();
    return token;
  } catch (err) {
    console.log('generateAuthToken ERR', err);   
    return err;
  }

}

const User = mongoose.model('User', UserSchema);

module.exports = {User};