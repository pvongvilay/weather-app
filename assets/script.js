var api = '5b30707a798e1418cf3da8be9af7d90b';
var searchEl = document.getElementById('search');
var buttonEl = document.querySelector('.submit');
var cityEl = document.getElementById('city');
var windEl = document.getElementById('wind');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var week = document.querySelector('.week');
function clickHandler(event) {
    var city = searchEl.value
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log (data)
        fiveDay(data)
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

function fiveDay (data) {
var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api}&units=imperial`
   fetch(url) 
   .then(response => {
    return response.json()
   })
   .then(data => {
    console.log(data)
     for (var i=0; i < data.list.length; i += 8){
        var element = data.list[i]
        console.log (element)
        var tempEl = document.createElement('p')
        var windEl = document.createElement('p')
        var humidityEl = document.createElement('p')
        var imageEl = document.createElement('img')
        tempEl.textContent='temp: ' + element.main.temp
        windEl.textContent='wind: '+ element.wind.speed
        humidityEl.textContent= element.main.humidity
        imageEl.setAttribute('src',`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`)
        week.append(tempEl,windEl,humidityEl,imageEl)
     }
   })
}
buttonEl.addEventListener('click',clickHandler)