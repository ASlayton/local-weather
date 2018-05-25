const zipValidator = require('./zipcode');
const promises = require('./promise');

const initializer = () => {
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
