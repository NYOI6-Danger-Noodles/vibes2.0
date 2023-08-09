const express = require('express');
const router = express.Router();

//controllers
const userController = require('../controllers/userController.js');
const placesController = require('../controllers/placesController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

// signup route handler
router.post(
  '/signup',
  userController.signup,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res, next) => {
    res.status(201).json({ message: 'User created!', user: res.locals.user });
  }
);

// login route handler
router.post(
  '/login',
  userController.login,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res, next) => {
    res
      .status(200)
      .json({ message: 'Logged in successfully!', user: res.locals.user });
  }
);

// populate beenList handler, add middleware for querying mongo for beenList and SQL for location names
// router.post('/beenList', userController.beenList, (req, res) => {
//   res.status(200).json({ beenList: res.locals.beenList });
// });

router.post('/savedList', userController.savedList, (req, res) => {
  res.status(200).json({ savedList: res.locals.savedList });
});

//populate results from user initiated search
router.post('/placeSearch', placesController.getResults, (req, res) => {
  res.status(200).json({
    searchResults: res.locals.searchResults,
    imgSrc: res.locals.src,
  });
});

router.get('/verifyUser', sessionController.verifyUser, (req, res) => {
  return res.status(200).json(false);
});

router.get('/savedList', placesController.getSavedPlaces, (req, res) => {
  return res.status(200).json(res.locals.savedPlaces);
});

//populate tags for searchList
// router.get('/searchTags')

// to add global error handler in server.js later
// if homepage loads, check if user has a session. if not, redirect to login page

module.exports = router;
