// API Weather

// const moment = require("./moment");

// https://home.openweathermap.org/api_keys
const APP_ID = 'c33306682d560bf7e0c640bb0927b8a5';

// Nếu không có giá trị, hiển thị giá trị mặc định
const DEFAULT_VALUE = '--';

// Nhập ô tìm kiếm
const searchInput = document.querySelector('#search-input');

// Hiển thị phần giữa
const cityName = document.querySelector('.city-name')
const weatherState = document.querySelector('.weather-state')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')

// Hiển thị phần dưới
const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')



searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('Search Input', data);

            // set data cho thông tin ở giữa
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE; 

            // set data cho thông tin phía dưới
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        });
});

