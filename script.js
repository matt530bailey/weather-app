const weatherHome = document.querySelector('#weatherStation');
const locationReq = document.querySelector('#location');
const searchBtn = document.querySelector('#selectBtn')

function reqApi() {
    const weatherApi = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={49df966d9c253f90278d84a948be3d6e}';
    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        }).then(data => {
            var dashBoard = document.createElement('li')
            dashBoard.textContent = list.main.temp;
            weatherHome.appendChild(dashBoard);
            console.log(data);
        }).catch(err => {
            console.log(err);})
            
    }

    function inputField() {
        searchBtn.addEventListener('click', () => {
            localStorage.setItem('city', locationReq.value);
            console.log(localStorage.getItem('city'));
        })
    }


