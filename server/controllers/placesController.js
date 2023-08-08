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
    const res = await axios(config);

    const formatted_res = res.data.results;
    // console.log(formatted_res);
    const results = formatted_res.map((el) => {
      return {
        place_name: el.name,
        address: el.formatted_address,
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

// formatted_res.forEach((el) => {
//   console.log('hel');
//   const photoParams = new URLSearchParams({
//     maxwidth: 400,
//     photo_reference: el.photos[0].photo_reference,
//     key: 'AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s',
//   });
//   console.log(photoParams);
//   console.log('hello');

//   const configForPhoto = {
//     method: 'get',
//     url: 'https://maps.googleapis.com/maps/api/place/photo?' + photoParams,
//     headers: {},
//   };

//   axios(configForPhoto).then((data) => {
//     res.locals.photos.push(photoRes);
//   });
// });
