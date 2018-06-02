const zipValidator = require('./zipcode');
const convert = require('./convert');
const fiveDay = require('./fiveDay');
const threeDay = require('./threeDay');
const scary = require('./scary');
const firebaseApi = require('./firebaseConfig');

const initEvents = () => {
  $('#toggle-one').bootstrapToggle({
    on: '&deg;F',
    off: '&deg;C',
  });
  $('#toggle-one').change(() => {
    convert.convertExisting();
  });
  $('#zip-input').on('keypress', keyTest);
  $('body').on('click', (e) => {
    if (e.target.id === 'go-btn') {
      zipValidator();
      $('#single-weather-stuff').removeClass('hide');
      $('#button-container').removeClass('hide');
    } else if (e.target.id === 'extended-forcast-link') {
      fiveDay.showMoreResults($('#zip-input').val());
      $('#extended-weather-stuff').removeClass('hide');
    } else if (e.target.id === 'extended-3day-link') {
      threeDay.showMoreResults($('#zip-input').val());
    } else if ($(e.target).hasClass('scary-btn')) {
      scary.saveScary(e);
    } else if ($(e.target).hasClass('save-btn')) {
      saveWeatherCardEvent(e);
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

const saveWeatherCardEvent = (e) => {
  let scaryElement = false;
  const thisWeatherCard = $(e.target).closest('.weatherCard');
  if (thisWeatherCard.hasClass('scary')) {
    scaryElement = true;
  };
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
