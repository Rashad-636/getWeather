//Global Constants
const LOW_TEMP = 34;
const HIGH_TEMP = 83;
const MAXSPEED = 15;

const init = () => {
  // Variable declaration and assignment
  let weatherButton;
  weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation);
}

// function initiates first request and gets lat, user, lng and city to be
// passed to next function
const getLocation = () => {
  // variable declaration and assignments
  let zip;
  zip = document.getElementById("zip");

  let input;
  input = zip.value;

  let user;
  user = "rashaddms";

  let country;
  country = "us";

  let url;
  url = `http://api.geonames.org/postalCodeSearchJSON?username=${user}&country=`
  + `${country}&postalcode=${input}`;

  let xhr;
  xhr = new XMLHttpRequest();

// Opens url and grabs information from JSON
  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      // Variable declaration and assignments
      let data;
      data = JSON.parse(xhr.responseText);
      console.log(data);

      let lat;
      lat = data.postalCodes[0].lat;

      let lng;
      lng = data.postalCodes[0].lng;

      let city;
      city = data.postalCodes[0].placeName;

      console.log(city);
      console.log(lat);
      console.log(lng);

      // call getWeather function
      getWeather(lat, lng, user, city);
    }
  }
  xhr.send(null);
}
// function call with lat, lng, user and city parameters (values being passed)
const getWeather = (lat, lng, user, city) => {
  let url;
  url = `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=`
  + `${lng}&username=${user}`;

  let xhr;
  xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      // variable declarations and assignments
      let data;
      data = JSON.parse(xhr.responseText);
      console.log(data.weatherObservation);

      let temperature;
      temperature = data.weatherObservation.temperature;
      console.log(data.weatherObservation.temperature);

      let windSpeed;
      windSpeed = data.weatherObservation.windSpeed;
      console.log(data.weatherObservation.windSpeed);

      // Calls displayResults function with city, temperature, and windSpeed
      // variables passed
      displayResults(city, temperature, windSpeed)
    }
  }
  xhr.send(null);
}
// Function displays results to page
const displayResults = (city, temperature, windSpeed) => {
  //Variable declarations
  let temperature2;
  // Variable assignments (for temperature2, farenheit variable returned
  // from convertCelsius function)
  temperature2 = convertCelsius(temperature);

  let container;
  container = document.getElementById("result");
  container.innerHTML = "";

  let outputOne;
  outputOne = document.createElement("h1");
  outputOne.textContent = `${city}`;

  let outputTwo;
  outputTwo = document.createElement("p");
    // If temperature is equal or less than 34 degrees, output cold image and
    // temperature.
    if (temperature2 <= LOW_TEMP){
      outputTwo.innerHTML = `${temperature2.toFixed(0)}`
      + `° Farenheit<img  src="../images/cold.jpg" />`;
    } else if (temperature2 >= HIGH_TEMP){
      // If temperature is 83 degrees or higer, ouput hot image and temperature
      outputTwo.innerHTML = `${temperature2.toFixed(0)}`
      + `° Farenheit<img  src="../images/hot.jpg" />`;
    } else {
      // Else, output temperature only
      outputTwo.innerHTML = `${temperature2.toFixed(0)}` + "° Farenheit";
    }

  let outputThree;
  outputThree = document.createElement("p");
// If windspeed is above 15mph, output windSpeed and wind image. Else,
// output windSpeed only.
    if (windSpeed > MAXSPEED){
      outputThree.innerHTML = `${windSpeed}`
      + ` mph Wind Speeds <img  src="../images/winds.png"/>`;
    } else {
      outputThree.innerHTML = `${windSpeed}` + " mph Wind Speeds";
    }

// adds variables to div element created and displays them
  container.appendChild(outputOne);
  container.appendChild(outputTwo);
  container.appendChild(outputThree);

}
// Function passes temperature value to be converted from Celsius to Farenheit
const convertCelsius = (temperature) => {
  // Variable declaration, conversion and assignment
  let farenheit;
  farenheit = (temperature * 9/5) + 32;
  // return this variable when called
  return farenheit;
}
// Loads init method
window.onload = init;
