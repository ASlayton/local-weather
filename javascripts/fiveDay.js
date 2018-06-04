const key = require('./weatherAPI');
const dom = require('./dom');
const convert = require('./convert');

const showMoreResults = (zipNum) => {
  searchExtWeather(zipNum)
    .then((result) => {
      createFiveDayForcast(result, '#extended-weather-stuff');
    })
    .catch((err) => {
      console.error('Errors have occured', err);
    });
};

const searchExtWeather = (txt) => {
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

const createFiveDayForcast = (dataArray, placeToPutIt) => {
  let myString = '';
  for (let i = 0; i < dataArray.list.length; i++) {
    const time = dataArray.list[i].dt_txt.split(' ').pop();
    const day = dataArray.list[i].dt_txt.split(' ').shift();
    const weatherIcon = dataArray.list[i].weather[0].icon;
    const myTempFarenheit = convert.convertF(dataArray.list[i].main.temp);
    const myTempCelsius = convert.convertC(dataArray.list[i].main.temp);
    if (time === '12:00:00') {
      myString += `<div class="col-sm-2 col-md-2">`;
      myString += `<div class="thumbnail">`;
      myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${dataArray.list[i].weather[0].main}" data-icon="${weatherIcon}">`;
      myString +=   `<button type="button" class="btn btn-danger btn-lg scary-btn" title="Too scary for me">
<img src="/images/scared.png" class="scared-icon"></button>`;
      myString +=  `<button type="button" class="btn btn-default btn-lg save-btn" title="Save this forcast">
<span class="glyphicon glyphicon-save"></span></button>`;
      myString +=   `<div class="caption">`;
      myString +=     `<h3 class="city">${dataArray.city.name}</h3>`;
      myString +=     `<p class="date">${day}</p>`;
      myString +=     `<p class="weather-status">${dataArray.list[i].weather[0].main}</p>`;

      if ($('#toggle-one').prop('checked')) {
        myString +=     `<p class="currentTemp">Temperature: <span class="farenheit">${myTempFarenheit}</span>&degF;</p>`;
        myString +=     `<p class="currentTemp hide">Temperature: <span class="celsius">${myTempCelsius}</span>&degC;</p>`;
      } else {
        myString +=     `<p class="currentTemp hide">Temperature: <span class="farenheit">${myTempFarenheit}</span>&degF;</p>`;
        myString +=     `<p class="currentTemp">Temperature: <span class="celsius">${myTempCelsius}</span>&degC;</p>`;
      };
      myString +=       `<p>Humidity: <span class="humidity">${dataArray.list[i].main.humidity}</span>%</p>`;
      myString +=     `<p>Pressure: <span>${dataArray.list[i].main.pressure}</span> hPa</p>`;
      myString +=     `<p>Wind Speed: <span class="wind">${dataArray.list[i].wind.speed}</span> meter/sec</p>`;
      myString +=   `</div>`;
      myString += `</div>`;
      myString += `</div>`;
    };
  };
  dom.printToDom(myString, placeToPutIt);
};

module.exports = {
  showMoreResults,
  createFiveDayForcast,
};
