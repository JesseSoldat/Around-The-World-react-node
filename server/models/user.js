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

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const access = "auth";
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET);
  user.tokens = [];
  user.tokens.push({access, token});

  try {
    await user.save();
    return token;
  } 
  catch(err) {
    console.log('generateAuthToken ERR', err);   
    return err;
  }
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  try {
    const user = await User.findOne({email});
    if(!user) {
      return Promise.reject({msg: 'No user found!'});
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) { resolve(user); }
        reject(err);
      });
    });
  }
  catch (err) {
    
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};