// `api.openweathermap.org/data/2.5/weather?zip=${},us&appid=${}`
const weatherAPI = require('./weatherAPI');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('/db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys.weather);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      weatherAPI.setKey(results.apiKey);
    })
    .catch((err) => {
      console.error('no keys', err);
    });
};

module.exports = {
  retrieveKeys,
};
