// `api.openweathermap.org/data/2.5/weather?zip=${},us&appid=${}`
const weatherAPI = require('./weatherAPI');
const firebaseApi = require('./firebaseAPI');
const auth = require('./auth');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('/db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      weatherAPI.setKey(results.weather.apiKey);
      firebaseApi.setConfig(results.firebaseKeys);
      firebase.initializeApp(results.firebaseKeys);
      auth.checkForUser();
    })
    .catch((err) => {
      console.error('no keys', err);
    });
};

module.exports = {
  retrieveKeys,
};
