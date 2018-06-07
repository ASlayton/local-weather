const zipValidator = require('./zipcode');
const convert = require('./convert');
const firebaseApi = require('./firebaseAPI');
const auth = require('./auth');

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
    if (e.target.id === 'go-btn') {
      zipValidator();
      $('#single-weather-stuff').removeClass('hide');
      $('#button-container').removeClass('hide');
    } else if (e.target.id === 'extended-forcast-link') {
      $('#extended-weather-stuff').removeClass('hide');
    } else if (e.target.id === 'extended-3day-link') {
      $('#extended-weather-stuff').removeClass('hide');
    } else if ($(e.target).hasClass('scary-btn')) {

    } else if ($(e.target).hasClass('save-btn')) {
      saveWeatherCardEvent(e);
    } else if (e.target.id === 'view-saved-btn') {
      returnSavedCards();
    };
  });
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zipValidator();
    $('#single-weather-stuff').removeClass('hide');
    $('#button-container').removeClass('hide');
  };
};

const returnSavedCards = () => {
  firebaseApi.getSavedCards()
    .then((cardsArray) => {
      console.log('Cards Array: ', cardsArray);
    })
    .catch((error) => {
      console.log('There was an error in retriving saved Cards', error);
    });
};

const saveWeatherCardEvent = (e) => {
  let scaryElement = false;
  const thisWeatherCard = $(e.target).closest('.weatherCard');
  if (thisWeatherCard.hasClass('scary')) {
    scaryElement = true;
  };
  console.log(thisWeatherCard.find('.weather-icon').data('icon'));
  const weatherCardToAdd = {
    icon: thisWeatherCard.find('.weather-icon').data('icon'),
    isScary: scaryElement,
    city: thisWeatherCard.find('.city').text(),
    weatherStatus: thisWeatherCard.find('.weather-status').text(),
    tempCel: thisWeatherCard.find('.farenheit').text(),
    tempFar: thisWeatherCard.find('.celsius').text(),
    humidity: thisWeatherCard.find('.humidity').text(),
    pressure: thisWeatherCard.find('.pressure').text(),
    wind: thisWeatherCard.find('.wind').text(),
  };
  firebaseApi.saveForecast(weatherCardToAdd)
    .then(() => {
    })
    .catch((error) => {
      console.error('Error in saving card: ', error);
    });
};

module.exports = {
  initEvents,
};
