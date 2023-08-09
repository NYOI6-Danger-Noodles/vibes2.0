const db = require('../../models/placesModel');
const axios = require('axios');

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
      const photo = el.photos[0].photo_reference
        ? el.photos[0].photo_reference
        : 'AUacShjZLaPlKPAfONNiOSt2LHqncrwKmalEyo-yx1DuXJNk12JNoNMS9mQxeyxwgN38ZDJqoSVOStEJMYtbwOLfAPPEvX_CvBzTvgZMMsmJTM_4rCShmpr9aZ1RfAEmsYFrNL6l1YoPHrsHzA0tamLd1EqI8xLeVjLpaw8sQH';
      console.log(photo);
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

module.exports = placesController;
