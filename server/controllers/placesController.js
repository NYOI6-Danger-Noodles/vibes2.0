const db = require('../../models/placesModel');
const axios = require('axios');
const { User } = require('../../models/userModel');

const placesController = {};

placesController.getResults = async (req, res, next) => {
  try {
    const { categories, neighborhoods } = req.body;
    console.log(categories);
    const params = new URLSearchParams({
      query: `${categories[0]}s in ${neighborhoods[0]}, NY`,
      key: 'AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s',
    });

    const config = {
      method: 'get',
      mode: 'no-cors',
      url:
        'https://maps.googleapis.com/maps/api/place/textsearch/json?' + params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log('reached controller');

    //make call to goole api
    const response = await axios(config);

    const formatted_res = response.data.results;
    console.log(formatted_res);
    const results = formatted_res.map((el) => {
      let photo =
        'AUacShg2C9Difnc5iXjTnDDv4wEImMj6quwVjsXbKCXcR8Rvt59POXMdMS-Ym3pmn061GyhG1XV6d2PMHTlKdxKOQIqRfrKRx0mqiqtzUbM6mwO3ih3NEw3J1SAafAi-nskFC4lymkxvYKnmCliG1oEW5vtAbtfM1rUm_6peD6T-n-JDn8_e';
      if (!el.photos) {
        console.log('No photo present');
      } else {
        console.log(el.photos[0].photo_reference);
        photo = el.photos[0].photo_reference;
      }

      return {
        place_name: el.name,
        address: el.formatted_address,
        photo,
      };
    });
    res.locals.searchResults = results;

    return next();
  } catch (err) {
    err = {
      log:
        'There was an error in the placesController.getResults middleware' +
        err,
      status: 500,
      message: { err: 'There was an unknown server error' },
    };
    return next(err);
  }
};

placesController.getSavedPlaces = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;
    console.log(ssid);
    const user = await User.findOne({ _id: ssid });
    console.log(user);

    if (!user) {
      const err = new Error(
        'Error in placesController.getSavedPlaces: User not found'
      );
      return next(err);
    }
    //get savedList from user, should be an array of IDs
    res.locals.savedPlaces = user.savedList;

    return next();
  } catch (err) {
    err = {
      log: 'Error getting new SavedList' + err,
      status: 500,
      message: { err: 'There was an unknown server error' },
    };
    return next(err);
  }
};

module.exports = placesController;
