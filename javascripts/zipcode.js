const weatherAPI = require('./weatherAPI');

let zipcode;

const zipValidator = () => {
  const zipTest = $('#zip-input').val();
  if (zipTest.length === 5 && $.isNumeric(zipTest)) {
    // DO A THING
    weatherAPI.showResults(zipTest);
    $('#city-name').removeClass('hide');
    $('#search-container').addClass('hide');
    zipcode = zipTest;
  } else {
    alert('Please enter a valid 5-digit zipcode.');
  };
};

const getZip = () => {
  return zipcode;
};

module.exports = {
  zipValidator,
  getZip,
};
