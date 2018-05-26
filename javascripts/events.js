const zipValidator = require('./zipcode');
const convert = require('./convert');

const initEvents = () => {
  $('#toggle-one').bootstrapToggle({
    on: '&deg;F',
    off: '&deg;C',
  });
  $('#toggle-one').change(() => {
    convert.convertExisting();
  });
  $('#go-btn').on('click', zipValidator);
  $('#zip-input').on('keypress', keyTest);
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zipValidator();
  };
};

module.exports = {
  initEvents,
};
