const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/',
  userControllers.getUsers
);

router.get('/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .isEmail()
      .withMessage({
        message: 'Not an email',
        errorCode: 1
      }),
    check('password')
      .isLength({ min: 6 })
      .withMessage('must be at least 6 chars long')
      .matches(/\d/)
      .withMessage('must contain a number')
  ], userControllers.signup
);

router.get('/login',
  [
    check('email')
      .isEmail()
      .withMessage({
        message: 'Not an email',
        errorCode: 1
      }),
    check('password')
      .isLength({ min: 6 })
      .withMessage('must be at least 6 chars long')
      .matches(/\d/)
      .withMessage('must contain a number')
  ], userControllers.login
);


module.exports = router;