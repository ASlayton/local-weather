const convertF = (temp) => {
  const convertedTemp = 1.8 * (temp - 273.15) + 32;
  return convertedTemp.toFixed(1);
};

const convertC = (temp) => {
  const convertedTemp = temp - 273.15;
  return convertedTemp.toFixed(1);
};

const convertExisting = () => {
  if ($('#toggle-one').prop('checked')) {
    $('.farenheit').closest('.currentTemp').removeClass('hide');
    $('.celsius').closest('.currentTemp').addClass('hide');
  } else {
    $('.celsius').closest('.currentTemp').removeClass('hide');
    $('.farenheit').closest('.currentTemp').addClass('hide');
  };
};

module.exports = {
  convertC,
  convertF,
  convertExisting,
};
