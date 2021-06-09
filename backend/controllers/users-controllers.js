const HttpError = require('../models/http-error');

const { v4: uuidv4 } = require('uuid');

const USERS2 = [
  { id: 'u1', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'A', places: 4 },
  { id: 'u2', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'B', places: 0 },
  { id: 'u3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU', name: 'C', places: 1 },
];

const USERS = [
  { id: 'u1', name: 'Max Schwarz', email: 'a@gmail.com', password: '123456' },
];



const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { name, email, password } = req.body

  const hasUser = USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, the email already exists!');
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password
  };

  USERS.push(createUser);

  res.status(201).json({ user: createUser });

};

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { email, password } = req.body;

  const identifiedUser = USERS.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not find any user, please check the credentials.', 401);
  }

  res.json({ message: 'user loged in succesfully' });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;