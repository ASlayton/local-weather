const convert = require('./convert');

const createTile = (data) => {
  let myString = '';
  const weatherIcon = data.weather[0].icon;
  const myTempFarenheit = convert.convertF(data.main.temp);
  const myTempCelsius = convert.convertC(data.main.temp);

  myString += `<div class="col-sm-2 col-md-2">`;
  myString += `<div class="thumbnail weatherCard">`;
  myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}" class="weather-icon">`;
  myString +=   `<button type="button" class="btn btn-default btn-lg scary-btn" title="Too scary for me">
  <img src="/images/scared.png" class="scared-icon"></button>`;
  myString +=  `<button type="button" class="btn btn-default btn-lg save-btn" title="Save this forcast">
  <span class="glyphicon glyphicon-save"></span></button>`;
  myString +=   `<div class="caption">`;
  myString +=     `<h3 class="weather-status">${data.name}</h3>`;
  myString +=     `<p>Current</p>`;
  myString +=     `<p>${data.weather[0].main}</p>`;

  if ($('#toggle-one').prop('checked')) {
    myString +=     `<p class="currentTemp farenheit">Temperature: <span>${myTempFarenheit}</span>&degF;</p>`;
    myString +=     `<p class="currentTemp celsius hide">Temperature: <span>${myTempCelsius}</span>&degC;</p>`;
  } else {
    myString +=     `<p class="currentTemp farenheit hide">Temperature: <span>${myTempFarenheit}</span>&degF;</p>`;
    myString +=     `<p class="currentTemp celsius">Temperature: <span>${myTempCelsius}</span>&degC;</p>`;
  };
  myString +=       `<p>Humidity: ${data.main.humidity}%</p>`;
  myString +=     `<p>Pressure: ${data.main.pressure} hPa</p>`;
  myString +=     `<p>Wind Speed: ${data.wind.speed} meters/sec</p>`;
  myString +=   `</div>`;
  myString += `</div>`;
  myString += `</div>`;

  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#current-weather-container').html(dataString);
};

module.exports = {
  createTile,
};
