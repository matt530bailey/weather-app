const currentWeather = document.querySelector('#CurrentWeatherCast');
const fiveDayWeather = document.querySelector('#fiveDayCast');
const locationReq = document.querySelector('#citySearch');
const searchBtn = document.querySelector('#selectBtn')


function weatherForcast(cityName) {
    console.log(cityName)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            // not creating divs as thought
            for (var i = 0; i < data; i++) {
                console.log(data);
                var futureCast = document.createElement('div');
                var futureTemp = document.createElement('h3');
                var futureWind = document.createElement('h3');
                var futureHumid = document.createElement('h3');
                futureTemp.innerHTML = "Currently " + data.list.main.temp + ' ℉';
                futureWind.innerHTML = "Wind is " + data.wind.speed + ' mph';
                futureHumid.innerHTML = "Humidity is " + data.main.humidity + ' %';

                futureCast.appendChild(futureTemp);
                futureCast.appendChild(futureWind);
                futureCast.appendChild(futureHumid);

                fiveDayWeather.appendChild(futureCast);
            }
        })
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => { 
            console.log(data)

            var currentWeatherCard = document.createElement('div');
            var cityDate = document.createElement('h1');
            var currentTempIcon = document.createElement('img');
                currentTempIcon.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            var currentTemp = document.createElement('h3');
            var currentWind = document.createElement('h3');
            var currentHumid = document.createElement('h3');

            cityDate.innerHTML = data.name + " " + (new Date().toLocaleDateString());
            currentTemp.innerHTML = "Currently " + data.main.temp + ' ℉';
            currentWind.innerHTML = "Wind is " + data.wind.speed + ' mph';
            currentHumid.innerHTML = "Humidity is " + data.main.humidity + ' %'

            currentWeatherCard.appendChild(cityDate);
            currentWeatherCard.appendChild(currentTempIcon);
            currentWeatherCard.appendChild(currentTemp);
            currentWeatherCard.appendChild(currentWind);
            currentWeatherCard.appendChild(currentHumid);
            currentWeather.appendChild(currentWeatherCard);
        })
            
}

// Code can be skipped here keeping for knowledge. 

// function cityToGeo(location) {
//     const cityUrlApi = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit={limit}&appid={49df966d9c253f90278d84a948be3d6e}`;
//     // TODO: Write a fetch to transofrm city/state/zip "location" string into a lat-long
//     fetch(cityUrlApi)
//         .then(function (response) {
//             return response.json();
//         })
//     // TODO: Supply lat -log to your `reqApi` function
// }
// function reqApi(lat, lon) {
//     const latLonApi = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={49df966d9c253f90278d84a948be3d6e}';
//     fetch(latLonApi)
//         .then(function (response) {
//             return response.json();
//         }).then(data => {
//             var dashBoard = document.createElement('li')
//             dashBoard.textContent = list.main.temp;
//             weatherHome.appendChild(dashBoard);
//             console.log(data);
//         }).catch(err => {
//             console.log(err);
//         })

// } // END of dead code ^^^^^^^^^^^^^^

function inputField() {
    // THis allows user to press enter on Keyboard
    locationReq.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
            localStorage.setItem('city', locationReq.value);
            weatherForcast(locationReq.value);
            locationReq.value = '';
        } else {
            // Will print 'error' while typing in city names 
            // console.log('error');
        }
    })
    // This allows user to press search button in window
    searchBtn.addEventListener('click', () => {
        localStorage.setItem('city', locationReq.value);
        //console.log(localStorage.getItem('city'));
        // cityToGeo(locationReq.value);
        weatherForcast(locationReq.value);
        locationReq.value = '';
    })
}

inputField();

