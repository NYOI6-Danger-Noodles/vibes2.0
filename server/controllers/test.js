

const axios = require('axios');

const placesController = {};

const params = new URLSearchParams({
    query: 'Triple Crown',
    key: 'AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s'
})

const config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?' + params,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });