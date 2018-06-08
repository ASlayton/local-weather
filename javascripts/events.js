const zip = require('./zipcode');
const convert = require('./convert');
const firebaseApi = require('./firebaseAPI');
const auth = require('./auth');
const extWeather = require('./extendedWeather');
const dom = require('./dom');

const initEvents = () => {
  $('#toggle-one').bootstrapToggle({
    on: '&deg;F',
    off: '&deg;C',
  });
  $('#toggle-one').change(() => {
    convert.convertExisting();
  });
  $('#zip-input').on('keypress', keyTest);
  auth.authEvents();
  $('body').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'go-btn') {
      zip.zipValidator();
      $('#single-weather-stuff').removeClass('hide');
      $('#button-container').removeClass('hide');
    } else if (e.target.id === 'extended-forcast-link') {
      $('#extended-weather-stuff').removeClass('hide');
      extWeather.showMoreResults(`${zip.getZip()}`, 5);
    } else if (e.target.id === 'extended-3day-link') {
      extWeather.showMoreResults(`${zip.getZip()}`, 3);
      $('#extended-weather-stuff').removeClass('hide');
    } else if ($(e.target).hasClass('scary-btn')) {
      $(e.target).closest('.weatherCard').toggleClass('scary');
    } else if ($(e.target).hasClass('save-btn')) {
      saveWeatherCardEvent(e);
    } else if (e.target.id === 'view-saved-btn') {
      returnSavedCards();
    };
  });
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zip.zipValidator();
    $('#single-weather-stuff').removeClass('hide');
    $('#button-container').removeClass('hide');
  };
};

const returnSavedCards = () => {
  firebaseApi.getSavedCards()
    .then((cardsArray) => {
      dom.printSavedCards(cardsArray, '#weather-display-container');
    })
    .catch((error) => {
      console.log('There was an error in retrieving saved Cards', error);
    });
};

const saveWeatherCardEvent = (e) => {
  let scaryElement = false;
  const thisWeatherCard = $(e.target).closest('.weatherCard');
  if (thisWeatherCard.hasClass('scary')) {
    scaryElement = true;
  };
  const weatherCardToAdd = {
    icon: thisWeatherCard.find('.weather-icon').data('icon'),
    isScary: scaryElement,
    city: $('#city-name').text(),
    weatherStatus: thisWeatherCard.find('.weather-status').text(),
    tempCel: thisWeatherCard.find('.farenheit').text(),
    tempFar: thisWeatherCard.find('.celsius').text(),
    humidity: thisWeatherCard.find('.humidity').text(),
    pressure: thisWeatherCard.find('.pressure').text(),
    wind: thisWeatherCard.find('.wind').text(),
    uid: firebaseApi.getUID(),
  };
  firebaseApi.saveForecast(weatherCardToAdd)
    .then(() => {
      $(e.target).addClass('hide');
    })
    .catch((error) => {
      console.error('Error in saving card: ', error);
    });
};

module.exports = {
  initEvents,
};
