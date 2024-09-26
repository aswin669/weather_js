async function checkWeather() {
  
    const city = document.querySelector("input").value;

   
    if (!city) {
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none";
        return; 
    }

    document.querySelector(".error").style.display = "none";

  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=5dcd428a798e9155820463025ca35ccf`;

    console.log(apiUrl);
    
    try {
       
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`City not found`);
        }

     
        const data = await response.json();

     
        if (data.main && data.main.temp) {
          
            document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

            
            document.querySelector(".weather").style.display = "block";
        } else {
            throw new Error("Temperature data not available");
        }
    } catch (error) {
        
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

document.querySelector("button").addEventListener("click", checkWeather);