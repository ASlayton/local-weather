const zipValidator = require('./zipcode');
const convert = require('./convert');
const fiveDay = require('./fiveDay');

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
