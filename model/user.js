const mongoose = require('mongoose');
const joi = reqire('joi');
const bcrypt = require('bcrypt');

const userScema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

userScema.virtual('passwordConfirmation').set(function (value) {
  this._passwordConfirmation = value;
});

userScema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const userObjt = {
    name: this.name,
    email: this.email,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation,
  };

  const Schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().reqired(),
    passwordConfirmation: joi
      .string()
      .reqired()
      .valid(joi.ref('password'))
      .messages({ 'any.only': 'password does not match' }),
  });

  await Schema.validateAsync(userObjt);
  next();
});

userScema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userScema.methods.comparePassword = async function (currentPD, candiatePD) {
  return await bcrypt.compare(currentPD, candiatePD);
};

const User = mongoose.model('user', userScema);

module.exports = User;
