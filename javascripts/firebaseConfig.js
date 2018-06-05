let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
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
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.data}/weather.json`,
    })
      .done(() => {

      })
      .fail((err) => {
        console.error('I have no idea what I am doing');
      });
  });
};

module.exports = {
  setConfig,
  saveForecast,
  getSavedCards,
};
