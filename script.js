const weatherHome = document.querySelector('#weatherStation');
const locationReq = document.querySelector('#location');
const searchBtn = document.querySelector('#selectBtn')


function fiveDayForcast(cityName) {
    console.log(cityName)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
        })
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => { 
            console.log(data);
            var currentWeatherCard = document.createElement('div');
            var cityDate = document.createElement('h1');
            var currentTemp = document.createElement('h3');
            var currentWind = document.createElement('h3');
            var currentHumid = document.createElement('h3');

            cityDate.innerHTML = data.name + " " + (new Date().toLocaleDateString());
            currentTemp.innerHTML = "Currently " + data.main.temp + ' ℉';
            currentWind.innerHTML = data.wind.speed + ' mph';
            currentHumid.innerHTML = data.main.humidity + ' %'

            currentWeatherCard.appendChild(cityDate);
            currentWeatherCard.appendChild(currentTemp);
            currentWeatherCard.appendChild(currentWind);
            currentWeatherCard.appendChild(currentHumid);
            weatherHome.appendChild(currentWeatherCard);

            console.log(data)
        })
            
}

function cityToGeo(location) {
    const cityUrlApi = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit={limit}&appid={49df966d9c253f90278d84a948be3d6e}`;
    // TODO: Write a fetch to transofrm city/state/zip "location" string into a lat-long
    fetch(cityUrlApi)
        .then(function (response) {
            return response.json();
        })
    // TODO: Supply lat -log to your `reqApi` function
}

function reqApi(lat, lon) {
    const latLonApi = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={49df966d9c253f90278d84a948be3d6e}';
    fetch(latLonApi)
        .then(function (response) {
            return response.json();
        }).then(data => {
            var dashBoard = document.createElement('li')
            dashBoard.textContent = list.main.temp;
            weatherHome.appendChild(dashBoard);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })

}

function inputField() {
    searchBtn.addEventListener('click', () => {
        localStorage.setItem('city', locationReq.value);
        //console.log(localStorage.getItem('city'));
        // cityToGeo(locationReq.value);
        fiveDayForcast(locationReq.value);
    })
}

inputField();

