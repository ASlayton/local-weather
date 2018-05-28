const zipValidator = require('./zipcode');
const convert = require('./convert');
const fiveDay = require('./fiveDay');
const threeDay = require('./threeDay');

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
    } else if (e.target.id === 'extended-forcast-link') {
      fiveDay.showMoreResults($('#zip-input').val());
      $('#extended-forcast-link').hide();
      $('#extended-3day-link').hide();
    } else if (e.target.id === 'extended-3day-link') {
      threeDay.showMoreResults($('#zip-input').val());
      $('#extended-forcast-link').hide();
      $('#extended-3day-link').hide();
    };
  });
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zipValidator();
  };
};

module.exports = {
  initEvents,
};
