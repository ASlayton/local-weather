let firebaseConfig = {};
let userID = '';

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const setUID = (userUID) => {
  userID = userUID;
};

const getUID = () => {
  return userID;
};

const saveForecast = (weatherCard) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/weather.json`,
      data: JSON.stringify(weatherCard),
    })
      .done((weatherKey) => {
        resolve(weatherKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getSavedCards = () => {
  return new Promise((resolve, reject) => {
    const allWeatherCardsArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/weather.json`,
    })
      .done((allWeatherCards) => {
        if (allWeatherCards !== null) {
          Object.keys(allWeatherCards).forEach((fbKey) => {
            allWeatherCards[fbKey].id = fbKey;
            allWeatherCardsArray.push(allWeatherCards[fbKey]);
          });
        };
        resolve(allWeatherCardsArray);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

module.exports = {
  setConfig,
  saveForecast,
  getSavedCards,
  setUID,
  getUID,
};
