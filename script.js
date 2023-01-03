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

            filteredItems.forEach(item => {
                const date = new Date(item.dt_txt);
                var futureCast = document.createElement('div');
                futureCast.innerHTML = `
                    <h3>${date.toLocaleDateString("en-US", { dateStyle: 'full' })}</h3>
                    <p>Temp: ${item.main.temp}</p>
                    <p>Feels Like: ${item.main.feels_like}</p>
                `;
                futureCast.className = "weatherDay";

                /*
                #fiveDayCast .weatherDay {
                    border: 1px solid #000; 
                    borderRadius: 4px; 
                    margin-right: 10px; 
                    width: calc(33% - 10px);
                }
                */

                fiveDayWeather.appendChild(futureCast);
            });
            
            // not creating divs as thought
            for (var i = 0; i < data.list; i++) {
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
            //TODO: Change this!
            alert("stupid");
            return;
        }
        const stateValue = formData.get("state");
        if (stateValue.length > 0) {
            searchQuery += ", " + stateValue;
        }
        let previousSearches = JSON.parse(localStorage.getItem('city')) ?? [];
        previousSearches.push(searchQuery);
        localStorage.setItem('city', JSON.stringify(previousSearches));
        weatherForcast(searchQuery);
        formEl.reset();
    });

    JSON.parse(localStorage.getItem('city').toLowerCase()).reverse().filter((element, i, cityArray) => {
        return cityArray.indexOf(element) == i
    }).forEach((historyItem, index, allItems) => {
        if (index < 5) {
            var locationBtn = document.createElement('button')
            locationBtn.innerHTML = historyItem;
            btnHome.appendChild(locationBtn);
            // build your DIV here
            // append DIV to some container in the HTML doc
        }
    })

}());

var reallyLongArrayName = [1,2 ,3, 4, 1, 2, 3, 4];
// [2, 4, 6, 8]
// reallyLongArrayName.indexOf(2) = 1
function tony(){
    
return reallyLongArrayName.filter((element, i, arr) => {
    return arr.indexOf(element) == i
})

    // return reallyLongArrayName.map((number, i, arr) => {
    //     console.log(arr)
    //     return number*2
    // })
}

console.log(tony())
// forEach((number, i, arr) => {
// newArr.push(number * 2)
// })