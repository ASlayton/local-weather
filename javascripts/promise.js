// `api.openweathermap.org/data/2.5/weather?zip=${},us&appid=${}`
const weatherAPI = require('./weatherAPI');
const firebase = require('./firebaseConfig');

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
      firebase.setConfig(results.firebase);
      firebase.initializeApp(results.firebaseKeys);
    })
    .catch((err) => {
      console.error('no keys', err);
    });
};

module.exports = {
  retrieveKeys,
};
