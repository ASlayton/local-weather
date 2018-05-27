const convert = require('./convert');
const key = require('./weatherAPI');

const showMoreResults = (zipNum) => {
  searchExtWeather(zipNum)
    .then((result) => {
      createFiveDayForcast(result);
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

const createFiveDayForcast = (dataArray) => {
  let myString = '';
  dataArray.list.forEach((data) => {
    const weatherIcon = data.weather[0].icon;
    const myTemp = convert(data.main.temp);

    myString += `<div class="col-sm-2 col-md-3">`;
    myString += `<div class="thumbnail">`;
    myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}">`;
    myString +=   `<div class="caption">`;
    myString +=     `<h3>${dataArray.city.name}</h3>`;
    myString +=     `<p>${data.dt_txt}</p>`;
    myString +=     `<p>${data.weather[0].main}</p>`;

    if ($('#toggle-one').prop('checked')) {
      myString +=     `<p>Temperature: <span id="currentTemp" class="farenheit">${myTemp}</span>&degF;</p>`;
    } else {
      myString +=     `<p>Temperature: <span id="currentTemp" class="celsius">${myTemp}</span>&degC;</p>`;
    };
    myString +=       `<p>Humidity: ${data.main.humidity}%</p>`;
    myString +=     `<p>Pressure: ${data.main.pressure} hPa</p>`;
    myString +=     `<p>Wind Speed: ${data.wind.speed} meter/sec</p>`;
    myString +=   `</div>`;
    myString += `</div>`;
    myString += `</div>`;
  });

  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#weather-display-container').append(dataString);
};

module.exports = {
  showMoreResults,
};
