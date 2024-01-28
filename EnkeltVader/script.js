var jsonData;
// API key
const apiKey = "8be857cb162e31b1a3899cf0cbbbc5ea";

//Ignore this line
let yekIpA = apiKey.split("").reverse().join("");

var inputField = document.getElementById("myInput");

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    var form = document.getElementById("myForm");
    // Access the value of the input field within the form
    var city = form.elements["myInput"].value;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      yekIpA;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        jsonData = data;

        var jsonString = JSON.stringify(jsonData, null, 2);

        console.log(jsonString);
        const jsonObj = JSON.parse(jsonString);

        //document.getElementById("contentDisplay").innerText = jsonString;
        var tempC = jsonObj.main.temp - 273.15;
        document.getElementById("currentTemp").innerText =
          tempC.toFixed(2) + "°C";

        var weatherText = jsonObj.weather[0].description;

        console.log("weatherText: " + weatherText);
        document.getElementById("weatherText").innerText = weatherText;

        document.getElementById("title").innerText = jsonObj.name;

        var weatherID = jsonObj.weather[0].id;
        var icon = document.getElementById("icon");
        switch (true) {
          //Åska
          case weatherID >= 200 && weatherID < 300:
            icon.className = "fa-solid fa-cloud-bolt";
            break;
          //Dugg
          case weatherID >= 300 && weatherID < 400:
            icon.className = "fa-regular fa-snowflake";
            break;
          //Regn
          case weatherID >= 500 && weatherID < 600:
            icon.className = "fa-solid fa-cloud-rain";
            break;
          //Snö
          case weatherID >= 600 && weatherID < 700:
            icon.className = "fa-regular fa-snowflake";
            break;
          //Dimma
          case weatherID >= 700 && weatherID < 800:
            icon.className = "fa-solid fa-smog";
            break;
          //Klar
          case weatherID == 800:
            icon.className = "fa-solid fa-sun";
            break;
          //Moln
          case weatherID >= 801 && weatherID < 900:
            icon.className = "fa-solid fa-cloud";
            break;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

// Add an event listener to the button element
document.getElementById("updateButton").addEventListener("click", function () {
  // Update the content of the paragraph element with id "contentDisplay"
});
