const convert = (temp) => {
  let convertedTemp;
  if ($('#toggle-one').prop('checked')) {
    convertedTemp = 1.8 * (temp - 273.15) + 32;
  } else {
    convertedTemp = temp - 273.15;
  };
  return convertedTemp.toFixed(1);
};

module.exports = convert;
