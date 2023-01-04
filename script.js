const currentWeather = document.querySelector('#CurrentWeatherCast');
const fiveDayWeather = document.querySelector('#fiveDayCast');
fiveDayWeather.style = "display: flex; justifyContent: center; flex-wrap: wrap;";
const cityFieldEl = document.querySelector('#citySearch');
const searchBtn = document.querySelector('#selectBtn');
const btnHome = document.querySelector('#btnHome');

function weatherForcast(location) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => {
            fiveDayWeather.innerHTML = "";

            const filteredItems = data.list.filter((val, index) =>
                val.dt_txt.indexOf("12:00:00") >= 0
            );
            console.log(filteredItems);

            filteredItems.forEach(item => {
                const date = new Date(item.dt_txt);
                var futureCast = document.createElement('div');
                futureCast.innerHTML = `
                    <h3>${date.toLocaleDateString("en-US", { dateStyle: 'full' })}</h3>
                    <p>Temp: ${item.main.temp}  ℉</p>
                    <p>Wind: ${item.wind.speed} mph</p>
                    <p>Humidity: ${item.main.humidity} %</p>
                `;
                // futureCast.className = "weatherDay";

                fiveDayWeather.appendChild(futureCast);
            });
            
        })
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=49df966d9c253f90278d84a948be3d6e`).then(response => {
            return response.json()
        }).then(data => { 
            console.log(data)
            currentWeather.innerHTML = "";

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

(function () {
    const formEl = document.getElementById("weatherSearch");
    formEl.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const formData = new FormData(formEl);
        let searchQuery = formData.get("citySearch");
        if (searchQuery.length < 3) {
            alert("Please Enter Valid City");
            return;
        }
        
        let previousSearches = JSON.parse(localStorage.getItem('city')) ?? [];
        previousSearches.push(searchQuery);
        localStorage.setItem('city', JSON.stringify(previousSearches));
        weatherForcast(searchQuery);
        formEl.reset();
    });

    JSON.parse(localStorage.getItem('city').toLowerCase()).reverse().filter((element, i, cityArray) => {
        return cityArray.indexOf(element) == i
    }).forEach((citySearchItem, index, allItems) => {
        if (index < 5) {
            var locationBtn = document.createElement('button')
            locationBtn.innerHTML = citySearchItem;
            btnHome.appendChild(locationBtn);
        }
    })

}());
// // // Example code from tutor session on filter/map/indexOf
// var reallyLongArrayName = [1,2 ,3, 4, 1, 2, 3, 4];
// // [2, 4, 6, 8]
// // reallyLongArrayName.indexOf(2) = 1
// function tony(){
    
// return reallyLongArrayName.filter((element, i, arr) => {
//     return arr.indexOf(element) == i
// })

//     // return reallyLongArrayName.map((number, i, arr) => {
//     //     console.log(arr)
//     //     return number*2
//     // })
// }

// console.log(tony())
// // forEach((number, i, arr) => {
// // newArr.push(number * 2)
// // })