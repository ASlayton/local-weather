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
    const time = data.dt_txt.split(' ').pop();
    const day = data.dt_txt.split(' ').shift();
    const weatherIcon = data.weather[0].icon;
    const myTempFarenheit = convert.convertF(data.main.temp);
    const myTempCelsius = convert.convertC(data.main.temp);
    if (time === '12:00:00') {
      myString += `<div class="col-sm-2 col-md-2">`;
      myString += `<div class="thumbnail">`;
      myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].main}">`;
      myString +=   `<button type="button" class="btn btn-default btn-lg">
  <img src="/images/scared.png" class="scared-icon"></button>`;
      myString +=   `<div class="caption">`;
      myString +=     `<h3>${dataArray.city.name}</h3>`;
      myString +=     `<p>${day}</p>`;
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
      myString +=     `<p>Wind Speed: ${data.wind.speed} meter/sec</p>`;
      myString +=   `</div>`;
      myString += `</div>`;
      myString += `</div>`;
    };
  });

  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#weather-display-container').html(dataString);
};

module.exports = {
  showMoreResults,
};
