const cookieParser = require('cookie-parser');

const { Session } = require('../../models/userModel');

const sessionController = {};

//Starts a user session by addind ssid to sessions store
sessionController.startSession = async (req, res, next) => {
  try {
    if (res.locals.ssid) {
      console.log('hit');
      await Session.updateOne(
        { cookieId: res.locals.ssid },
        { createdAt: Date.now() },
        { upsert: true }
      );
      return next();
    }
    return next({ mesage: { err: 'An error has occured' } });
  } catch (error) {
    const err = new Error('Error in session controller: ' + error.message);
    return next(err);
  }
};

//Makes sure user has valid permissions to be on pagee
sessionController.verifyUser = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;

    const session = await Session.findOne({ cookieId: ssid });
    if (session) {
      return res.status(200).json('true');
    } else {
      return next();
    }
  } catch (err) {
    return next({ err });
  }
};

module.exports = sessionController;
