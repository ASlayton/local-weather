const zipValidator = () => {
  const zipTest = $('#zip-input').val();
  if (zipTest.length === 5 && $.isNumeric(zipTest)) {
    // DO A THING
    console.log('Zipcode is valid');
  } else {
    alert('Please enter a valid 5-digit zipcode.');
  };
};

module.exports = zipValidator;
