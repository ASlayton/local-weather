const zipValidator = require('./zipcode');

const initializer = () => {
  $('#go-btn').on('click', zipValidator);
  $('#zip-input').on('keypress', keyTest);
};

const keyTest = (e) => {
  if (e.key === 'Enter') {
    zipValidator();
  };
};

initializer();
