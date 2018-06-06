const dom = require('./dom');
const convert = require('./convert');

const printSavedCards = (dataArray) => {
  let myString = '';
  dataArray.forEach((data) => {
    let myString = '';
    const weatherIcon = data.icon;

    myString += `<div class="col-sm-2 col-md-2">`;
    myString += `<div class="thumbnail weatherCard">`;
    myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}" data-icon="${weatherIcon}" class="weather-icon">`;
    myString +=   `<button type="button" class="btn btn-danger btn-lg scary-btn" title="Too scary for me">
    <img src="/images/scared.png" class="scared-icon"></button>`;
    myString +=  `<button type="button" class="btn btn-default btn-lg save-btn" title="Save this forcast">
    <span class="glyphicon glyphicon-save"></span></button>`;
    myString +=   `<div class="caption">`;
    myString +=     `<h3 class="city">${data.name}</h3>`;
    myString +=     `<p class="day">Current</p>`;
    myString +=     `<p class="weather-status">${data.weather[0].main}</p>`;

    if ($('#toggle-one').prop('checked')) {
      myString +=     `<p class="currentTemp">Temperature: <span class="farenheit">${myTempFarenheit}</span>&degF;</p>`;
      myString +=     `<p class="currentTemp hide">Temperature: <span class="celsius">${myTempCelsius}</span>&degC;</p>`;
    } else {
      myString +=     `<p class="currentTemp hide">Temperature: <span class="farenheit">${myTempFarenheit}</span> &degF;</p>`;
      myString +=     `<p class="currentTemp">Temperature: <span class="celsius">${myTempCelsius}</span> &degC;</p>`;
    };
    myString +=       `<p>Humidity: <span  class="humidity">${data.humidity}</span>%</p>`;
    myString +=     `<p>Pressure: <span  class="pressure">${data.pressure}</span> hPa</p>`;
    myString +=     `<p>Wind Speed: <span  class="wind">${data.windspeed}</span> meters/sec</p>`;
    myString +=   `</div>`;
    myString += `</div>`;
    myString += `</div>`;
  });
  dom.printToDom(myString, 'weather-display-container');
};

module.exports = {
  printSavedCards,
};
