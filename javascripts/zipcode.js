const weatherAPI = require('./weatherAPI');

const zipValidator = () => {
  const zipTest = $('#zip-input').val();
  if (zipTest.length === 5 && $.isNumeric(zipTest)) {
    // DO A THING
    weatherAPI.showResults(zipTest);
    $('#city-name').removeClass('hide');
    $('#search-container').addClass('hide');
  } else {
    alert('Please enter a valid 5-digit zipcode.');
  };
};

module.exports = zipValidator;
