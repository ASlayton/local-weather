const zipValidator = require('./zipcode');
const promises = require('./promise');
const convert = require('./convert');

const initializer = () => {
  $('#toggle-one').bootstrapToggle({
    on: '&deg;F',
    off: '&deg;C',
  });
  $('#toggle-one').change(() => {
    convert();
  });
  promises.retrieveKeys();
  $('#go-btn').on('click', zipValidator);
  $('#zip-input').on('keypress', keyTest);
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zipValidator();
  };
};

initializer();
