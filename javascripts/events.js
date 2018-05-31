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
      scary.saveScary();
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
    const thisWeatherCard = $(e.target).closest('weatherCard'),
    const weatherCardToAdd = {
      icon: weatherCardToAdd.find('img'),
      isScary:

    };
  });
};

module.exports = {
  initEvents,
};
