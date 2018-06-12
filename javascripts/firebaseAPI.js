const dom = require('./dom');

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

const returnSavedCards = () => {
  getSavedCards()
    .then((cardsArray) => {
      dom.printSavedCards(cardsArray, '#saved-weather-cards');
      // $('#weather-display-container').removeClass('hide');
    })
    .catch((error) => {
      console.log('There was an error in retrieving saved Cards', error);
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

const deleteCard = (e) => {
  const cardToRemove = $(e.target).closest('.weatherCard');
  const idToRemove = cardToRemove.data('firebaseId');
  deleteCardFromDB(idToRemove)
    .then(() => {
      returnSavedCards();
    })
    .catch((err) => {
      console.error('Error in deleting the card'. err);
    });
};

const deleteCardFromDB = (cardID) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/weather/${cardID}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  saveForecast,
  getSavedCards,
  setUID,
  getUID,
  deleteCard,
  returnSavedCards,
};
