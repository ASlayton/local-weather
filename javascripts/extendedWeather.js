const convert = require('./convert');
const key = require('./weatherAPI');
const dom = require('./dom');

const showMoreResults = (zipNum, amt) => {
  searchExtendedWeather(zipNum)
    .then((result) => {
      createExtendedForcast(result, '#weather-display-container', amt);
    })
    .catch((err) => {
      console.error('Errors have occured', err);
    });
};

const searchExtendedWeather = (txt) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.openweathermap.org/data/2.5/forecast?zip=${txt},us&appid=${key.getKey()}`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const createExtendedForcast = (dataArray, placeToPutIt, amt) => {
  let myString = '';
  let count = 0;
  for (let i = 0; i < dataArray.list.length; i++) {
    const time = dataArray.list[i].dt_txt.split(' ').pop();
    const day = dataArray.list[i].dt_txt.split(' ').shift();
    const weatherIcon = dataArray.list[i].weather[0].icon;
    const myTempFarenheit = convert.convertF(dataArray.list[i].main.temp);
    const myTempCelsius = convert.convertC(dataArray.list[i].main.temp);
    if (time === '12:00:00') {
      count++;
      if (count <= amt) {
        myString += `<div class="col-sm-2 col-md-3">`;
        myString += `<div class="thumbnail weatherCard">`;
        myString += `<div>`;
        myString += `<h3>${day}</h3>`;
        myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${dataArray.list[i].weather[0].main}" data-icon="${weatherIcon}" class="weather-icon col-md-2">`;
        myString +=     `<p class="weather-status col-md-2">${dataArray.list[i].weather[0].main}</p>`;
        myString += `<div class="col-md-2">`;
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
        myString +=       `<p>Humidity: <span  class="humidity">${dataArray.list[i].main.humidity}</span>%</p>`;
        myString +=     `<p>Pressure: <span  class="pressure">${dataArray.list[i].main.pressure}</span> hPa</p>`;
        myString +=     `<p>Wind Speed: <span  class="wind">${dataArray.list[i].wind.speed}</span> meters/sec</p>`;
        myString +=   `</div>`;
        myString += `</div>`;
        myString += `</div>`;
      };
    };
  };
  dom.printToDom(myString, placeToPutIt);
};

module.exports = {
  showMoreResults,
};
