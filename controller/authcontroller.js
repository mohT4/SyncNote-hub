const User = require('../model/user');
const catchAsync = require('../middlewares/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signUp = catchAsync((req, res, next) => {
  const user = User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  });

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token: token,
    data: {
      user: user,
    },
  });
});
exports.logIn = catchAsync((req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next();

  const user = User.findOne(email, password).select(+password);

  if (!user || !user.comparePassword(password, user.password)) next();

  const token = signToken(user._id);

  res.status(200).json({
    status: 'sucess',
    token: token,
    data: {
      user,
    },
  });
});
