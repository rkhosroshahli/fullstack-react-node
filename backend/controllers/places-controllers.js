const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');

/* let PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  },
  {
    id: 'p2',
    image: 'https://images.kojaro.com/2020/9/75d0f4b7-67ba-4632-b6f9-95689f9c4093.jpg',
    title: 'Azadi Tower',
    description: 'Landmark tower with an underground museum, gallery & an observation deck with views of the city.',
    address: 'Tehran Province, Tehran, District 10, Azadi Square, Iran',
    location: {
      lat: 35.6997315,
      lng: 51.3380857
    },
    creator: 'u1'
  },
  {
    id: 'p3',
    image: 'https://mohajerist.com/wp-content/uploads/2021/03/milad.jpg',
    title: 'Milad Tower',
    description: '435m telecommunications tower opened in 2007, with an observation deck & a revolving restaurant.',
    address: 'Tehran, Tehran Province, Iran',
    location: {
      lat: 35.7448459,
      lng: 51.3731325
    },
    creator: 'u2'
  }
]; */

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //let places;
  let userWithPlaces;
  try {
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate('places')
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  // if (!places || places.length === 0) {
  //   return next(
  //     new HttpError('Could not find a place for the provided id.', 404)
  //   );
  // }
  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(
      new HttpError('Could not find place for the provided id.', 404)
    );
  }


  // res.json({ places: places.map(place => place.toObject({ getters: true })) });
  res.json({ places: userWithPlaces.map(place => place.toObject({ getters: true })) });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data.s', 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  // const createdPlace = {
  //   id: uuidv4(),
  //   title,
  //   description,
  //   location: coordinates,
  //   address,
  //   creator
  // };

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: 'https://images.kojaro.com/2020/9/75d0f4b7-67ba-4632-b6f9-95689f9c4093.jpg',
    creator
  });

  let user;
  try {
    user = User.findById(creator);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find user.', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find any user with creator, check the user id.', 422)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.endSession();
  } catch (err) {
    return next(
      new HttpError('Creating place failed, please try again.', 500)
    );
  }

  try {
    createdPlace.save();
  } catch (err) {
    return next(
      new HttpError('Creating place failed, please try again.', 500)
    );
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find place', 500)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update place', 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = Place.findById(placeId).populate('creator');
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find place', 500)
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find place for this id', 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete place', 500)
    );
  }

  res.status(200).json({ message: 'Deleted the place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
