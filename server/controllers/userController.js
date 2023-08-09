const { User } = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const db = require('../../models/placesModel');

const UserController = {
  // create a new user in the database
  // their information will be sent in the request body

  //DN: updating auth flow, removing bcrypt, moving to userModel
  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log(password);
      const newUser = await User.create({
        username,
        password,
      });
      res.locals.user = newUser;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.signup: ' + error.message);
      return next(err);
    }
  },

  // authenticate user login
  // user credentials will be sent in the request body
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        const err = new Error('Error in UserController.login: User not found');
        return next(err);
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const err = new Error('Error in UserController.login: Wrong password');
        return next(err);
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  //getting saved list from mongo
  savedList: async (req, res, next) => {
    try {
      const { username, placeData } = req.body;
      const user = await User.findOne({ username: username });

      if (!user) {
        const err = new Error(
          'Error in UserController.savedList: User not found'
        );
        return next(err);
      }
      //get savedList from user, should be an array of IDs
      user.savedList.push(placeData);
      res.locals.savedList = user.savedList;
      await user.save();
      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },

  beenList: async (req, res, next) => {
    try {
      const { username, placeData } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        const err = new Error(
          'Error in UserController.savedList: User not found'
        );
        return next(err);
      }

      //get beenList from user, should be an array of IDs
      user.beenList.push(placeData);
      res.locals.beenList = user.beenList;
      await user.save();

      return next();
    } catch (error) {
      const err = new Error('Error in UserController.login: ' + error.message);
      return next(err);
    }
  },
};

module.exports = UserController;
