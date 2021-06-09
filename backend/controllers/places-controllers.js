const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let PLACES = [
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
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = PLACES.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find any places for the provided user id.', 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  const placeToUpdate = { ...PLACES.find(p => p.id === placeId) };
  const placeIndex = PLACES.findIndex(p => p.id === placeId);
  placeToUpdate.title = title;
  placeToUpdate.description = description;
  PLACES[placeIndex] = placeToUpdate;
  res.status(200).json({ place: placeToUpdate });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const placeIndex = PLACES.findIndex(p => p.id === placeId);
  PLACES.splice(placeIndex, 1);
  res.status(200).json({ message: 'Deleted the place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
