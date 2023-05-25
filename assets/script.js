var api = '5b30707a798e1418cf3da8be9af7d90b';
var searchEl = document.getElementById('search');
var buttonEl = document.querySelector('.submit');
var cityEl = document.getElementById('city');
var windEl = document.getElementById('wind');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
function clickHandler(event) {
    var city = searchEl.value
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log (data)
        return data
    })
    .then(function(cords){
       return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cords[0].lat}&lon=${cords[0].lon}&appid=${api}&units=imperial`)

    })
    .then(function(response){
        return response.json()
        
    })
    .then(function(data){
        console.log (data)
        tempEl.textContent=data.main.temp
        windEl.textContent=data.wind.speed
        humidityEl.textContent=data.main.humidity
        cityEl.textContent=data.name
    })
}

buttonEl.addEventListener('click',clickHandler)