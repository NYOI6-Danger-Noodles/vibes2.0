const cookieParser = require('cookie-parser');

const { User } = require('../../models/userModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    const { username } = req.body;
    const foundUser = await User.findOne({ username });
    const id = foundUser._id;
    res.cookie('ssid', id, { httpOnly: true });
    res.locals.ssid = id.toString();
    return next();
  } catch (error) {
    const err = new Error('Error in ssid controller: ' + error.message);
    return next(err);
  }
};

module.exports = cookieController;
