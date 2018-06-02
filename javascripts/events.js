const zipValidator = require('./zipcode');
const convert = require('./convert');
const fiveDay = require('./fiveDay');
const threeDay = require('./threeDay');
const scary = require('./scary');

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
    } else if ($(e.target).hasClass('save=btn')) {
      saveWeatherCard();
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

const saveWeatherCard = () => {
  $(document).on('click', '.saveWeatherCard', (e) => {
    let scaryElement = false;
    if ($(e.target).hasClass('scary')) {
      scaryElement = true;
    };
    const thisWeatherCard = $(e.target).closest('weatherCard');
    const weatherCardToAdd = {
      icon: thisWeatherCard.find('img.weather-icon'),
      isScary: scaryElement,
      weatherStatus: thisWeatherCard.find('.weather-status').text();

    };
    console.log(weatherCardToAdd);
  });
};

module.exports = {
  initEvents,
  saveWeatherCard,
};
