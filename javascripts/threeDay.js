const convert = require('./convert');
const key = require('./weatherAPI');

const showMoreResults = (zipNum) => {
  search3DayWeather(zipNum)
    .then((result) => {
      createThreeDayForcast(result);
    })
    .catch((err) => {
      console.error('Errors have occured', err);
    });
};

const search3DayWeather = (txt) => {
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

const createThreeDayForcast = (dataArray) => {
  let myString = '';
  let countIt = 0;
  for (let i = 0; i < dataArray.list.length; i++) {
    const time = dataArray.list[i].dt_txt.split(' ').pop();
    const day = dataArray.list[i].dt_txt.split(' ').shift();
    const weatherIcon = dataArray.list[i].weather[0].icon;
    const myTempFarenheit = convert.convertF(dataArray.list[i].main.temp);
    const myTempCelsius = convert.convertC(dataArray.list[i].main.temp);
    if (time === '12:00:00') {
      countIt++;
      if (countIt < 4) {
        myString += `<div class="col-sm-2 col-md-2">`;
        myString += `<div class="thumbnail">`;
        myString +=   `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${dataArray.list[i].weather[0].main}">`;
        myString +=   `<div class="caption">`;
        myString +=     `<h3>${dataArray.city.name}</h3>`;
        myString +=     `<p>${day}</p>`;
        myString +=     `<p>${dataArray.list[i].weather[0].main}</p>`;

        if ($('#toggle-one').prop('checked')) {
          myString +=     `<p class="currentTemp farenheit">Temperature: <span>${myTempFarenheit}</span>&degF;</p>`;
          myString +=     `<p class="currentTemp celsius hide">Temperature: <span>${myTempCelsius}</span>&degC;</p>`;
        } else {
          myString +=     `<p class="currentTemp farenheit hide">Temperature: <span>${myTempFarenheit}</span>&degF;</p>`;
          myString +=     `<p class="currentTemp celsius">Temperature: <span>${myTempCelsius}</span>&degC;</p>`;
        };
        myString +=       `<p>Humidity: ${dataArray.list[i].main.humidity}%</p>`;
        myString +=     `<p>Pressure: ${dataArray.list[i].main.pressure} hPa</p>`;
        myString +=     `<p>Wind Speed: ${dataArray.list[i].wind.speed} meter/sec</p>`;
        myString +=   `</div>`;
        myString += `</div>`;
        myString += `</div>`;
      };
    };
  };
  console.log(myString);
  printToDom(myString);
};

const printToDom = (dataString) => {
  $('#weather-display-container').append(dataString);
};

module.exports = {
  showMoreResults,
};
