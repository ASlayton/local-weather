const convert = require('./convert');

const createTile = (data) => {
  let myString = '';
  const weatherIcon = data.weather[0].icon;
  const myTempFarenheit = convert.convertF(data.main.temp);
  const myTempCelsius = convert.convertC(data.main.temp);

  myString += `<div class="col-sm-2 col-md-2">`;
  myString += `<div class="thumbnail">`;
  myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}">`;
  myString +=   `<button type="button" class="btn btn-default btn-lg">
  <img src="/images/scared.png" class="scared-icon"></button>`;
  myString +=   `<div class="caption">`;
  myString +=     `<h3>${data.name}</h3>`;
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
  myString +=     `<button id="extended-3day-link">View 3 day forcast</button>`;
  myString +=     `<button id="extended-forcast-link">View 5 day forcast</button>`;
  myString +=   `</div>`;
  myString += `</div>`;
  myString += `</div>`;

  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#weather-display-container').html(dataString);
};

module.exports = {
  createTile,
};
