const db = require('../../models/placesModel');
const axios = require('axios');

const placesController = {};

placesController.getResults = async (req, res, next) => {
  try {
    const { categories, neighborhoods } = req.body;

    const params = new URLSearchParams({
      query: `${categories[0]}s in ${neighborhoods[0]}, NY`,
      key: 'AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s',
    });

    const config = {
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/place/textsearch/json?' + params,
      headers: {},
    };
    console.log('reached controller');

    //make call to goole api
    const resonse = await axios(config);

    const formatted_res = resonse.data.results;
    const results = formatted_res.map((el) => {
      return {
        place_name: el.name,
        address: el.formatted_address,
        photo: el.photos[0].photo_reference,
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

module.exports = placesController;
