const { Router } = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = new Router;

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post('/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description')
      .isLength({ min: 5 })
  ],
  placesControllers.createPlace
);

router.patch('/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description')
      .isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
