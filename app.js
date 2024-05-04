const firebaseConfig = {
    apiKey: "AIzaSyBMknXcnBuPjsVZQTRYaY96-fn5rGhpqgk",
    authDomain: "newsletter-app-f3802.firebaseapp.com",
    databaseURL: "https://newsletter-app-f3802-default-rtdb.firebaseio.com",
    projectId: "newsletter-app-f3802",
    storageBucket: "newsletter-app-f3802.appspot.com",
    messagingSenderId: "501890067776",
    appId: "1:501890067776:web:b4777b89d25b50f3985ea5"
  };

  firebase.initializeApp(firebaseConfig);

  let city,long,lat;

////og code
const api = {
    key: "bd59aafb879cf4b108ae961496eeeea0",
    base: "https://api.openweathermap.org/data/2.5/"
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

    

        const searchbox = document.querySelector('.search-box');
        searchbox.addEventListener('mouseover', setQuery);
        
        function setQuery() {
            getResults();
            searchbox.style.visibility='hidden';
        }
     })
  }

function getResults(query) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp - 273)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min - 273)}°c / ${Math.round(weather.main.temp_max - 273)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}



//// new code
// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  city;
  lat;
  long;

  saveMessages(city,lat,long);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (city,lat,long) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    city: city,
    lat: lat,
    long: long
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
