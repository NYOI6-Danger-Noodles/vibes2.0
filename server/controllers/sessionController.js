const cookieParser = require('cookie-parser');

const { Session } = require('../../models/userModel');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  console.log(res.locals.ssid);
  try {
    if (res.locals.ssid) {
      console.log('hit');
      await Session.create({ cookieId: res.locals.ssid });
      return next();
    }
    return next({ mesage: { err: 'An error has occured' } });
  } catch (error) {
    const err = new Error('Error in session controller: ' + error.message);
    return next(err);
  }
};

module.exports = sessionController;
