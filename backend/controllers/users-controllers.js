const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/user');


/* const USERS2 = [
  { id: 'u1', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'A', places: 4 },
  { id: 'u2', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'B', places: 0 },
  { id: 'u3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU', name: 'C', places: 1 },
]; */

/* const USERS = [
  { id: 'u1', name: 'Max Schwarz', email: 'a@gmail.com', password: '123456' },
]; */


const getUsers = async (req, res, next) => {

  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not get users')
    );
  }

  if (!users) {
    return next(
      new HttpError('There is no user.')
    );
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { name, email, password } = req.body

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not get users', 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError('This email has already registered to an user', 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not create user', 500)
    )
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });

};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not get users', 500)
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError('Invalid credentials, could not log you in.', 401)
    );
  }

  res.json({ message: 'User logged in successfully' });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;