const convert = require('./convert');

const createTile = (data, placeToPrint) => {
  let myString = '';
  const weatherIcon = data.weather[0].icon;
  const myTempFarenheit = convert.convertF(data.main.temp);
  const myTempCelsius = convert.convertC(data.main.temp);

  myString += `<div col-md-10 col-md-offset-1>`;
  myString += `<div class="thumbnail weatherCard" data-firebase-id="${data.id}">`;
  myString += `<div>`;
  myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}" data-icon="${weatherIcon}" class="weather-icon col-md-4">`;
  myString +=     `<p class="weather-status col-md-4">${data.weather[0].main}</p>`;
  myString += `<div class="col-md-4">`;
  myString +=   `<button type="button" class="btn btn-danger btn-lg scary-btn" title="Too scary for me">
  <img src="/images/scared.png" class="scared-icon"></button>`;
  myString +=  `<button type="button" class="btn btn-default btn-lg save-btn" title="Save this forcast">
  <span class="glyphicon glyphicon-save"></span></button>`;
  myString += `</div></div>`;
  myString +=   `<div class="caption">`;

  if ($('#toggle-one').prop('checked')) {
    myString +=     `<p class="currentTemp">Temperature: <span class="farenheit">${myTempFarenheit}</span>&degF</p>`;
    myString +=     `<p class="currentTemp hide">Temperature: <span class="celsius">${myTempCelsius}</span>&degC</p>`;
  } else {
    myString +=     `<p class="currentTemp hide">Temperature: <span class="farenheit">${myTempFarenheit}</span> &degF</p>`;
    myString +=     `<p class="currentTemp">Temperature: <span class="celsius">${myTempCelsius}</span> &degC</p>`;
  };
  myString +=       `<p>Humidity: <span  class="humidity">${data.main.humidity}</span>%</p>`;
  myString +=     `<p>Pressure: <span  class="pressure">${data.main.pressure}</span> hPa</p>`;
  myString +=     `<p>Wind Speed: <span  class="wind">${data.wind.speed}</span> meters/sec</p>`;
  myString +=   `</div>`;
  myString += `</div>`;
  myString += `</div>`;

  printToDom(myString, placeToPrint);
  printToDom(`${data.name}`, `#city-name`);
};

const printSavedCards = (dataArray, placeToPutIt) => {
  let myString = '';
  dataArray.forEach((data) => {
    myString += `<div col-md-10 col-md-offset-1>`;
    if (data.scary === true) {
      myString += `<div class="thumbnail weatherCard scary" data-firebase-id="${data.id}">`;
    } else {
      myString += `<div class="thumbnail weatherCard" data-firebase-id="${data.id}">`;
    };
    myString += `<div>`;
    myString += `<h1>${data.city}</h1>`;
    myString +=   `<img src="https://openweathermap.org/img/w/${data.icon}.png" alt="${data.weatherStatus}" data-icon="${data.icon}" class="weather-icon col-md-4">`;
    myString +=     `<p class="weather-status col-md-4">${data.weatherStatus}</p>`;
    myString += `<button type="button" class="btn btn-default btn-lg delete-card" title="Delete Me"></button>`;
    myString += `</div>`;
    myString +=   `<div class="caption">`;

    if ($('#toggle-one').prop('checked')) {
      myString +=     `<p class="currentTemp">Temperature: <span class="farenheit">${data.tempFar}</span>&degF</p>`;
      myString +=     `<p class="currentTemp hide">Temperature: <span class="celsius">${data.tempCel}</span>&degC</p>`;
    } else {
      myString +=     `<p class="currentTemp hide">Temperature: <span class="farenheit">${data.tempFar}</span> &degF</p>`;
      myString +=     `<p class="currentTemp">Temperature: <span class="celsius">${data.tempCel}</span> &degC</p>`;
    };
    myString +=       `<p>Humidity: <span  class="humidity">${data.humidity}</span>%</p>`;
    myString +=     `<p>Pressure: <span  class="pressure">${data.pressure}</span> hPa</p>`;
    myString +=     `<p>Wind Speed: <span  class="wind">${data.wind}</span> meters/sec</p>`;
    myString +=   `</div>`;
    myString += `</div>`;
    myString += `</div>`;
  });
  printToDom(myString, placeToPutIt);
};

const printToDom = (myString, placeToPutIt) => {
  $(placeToPutIt).html(myString);
};

module.exports = {
  createTile,
  printToDom,
  printSavedCards,
};
