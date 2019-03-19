window.addEventListener('load', () => {
    let long, 
        lat,
        tempDesc = document.querySelector('.temp-decription'),
        tempDeg = document.querySelector('.temp-degree'),
        locationTimezone = document.querySelector('.location-timezone'),
        degreeSection = document.querySelector('.degree-section'),
        degreeSpan = document.querySelector('.degree-section span');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';    
            const api = `${proxy}https://api.darksky.net/forecast/16a2c4619b5fbbe218a9dc607443b4cb/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    // Set DOM elements from the API
                    tempDeg.textContent = temperature;
                    tempDesc.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // Formula for converting from Fahreinhet to Celsius
                    let celsius = (temperature - 32) * (5/9);
                    // Set icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Change temperature to Celsius/Fahrenheit
                    degreeSection.addEventListener('click', () => {
                        if(degreeSpan.textContent === "°F") {
                            degreeSpan.textContent = "°C";
                            tempDeg.textContent = Math.ceil(celsius);
                        } else {
                            degreeSpan.textContent = "°F";
                            tempDeg.textContent = temperature;
                        }
                    });
                })

        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});