window.addEventListener('load', () => {
    let lon;
    let lat;

    // temperature value and description 
    let tempValue = document.getElementById('temperature-value');
    let tempDescription = document.getElementById('temperature-description')
    // location, speed and icon variables 
    let location = document.getElementById('location');
    let animatedIcon = document.getElementById('animatedIcon');
    let wind_speed = document.getElementById('wind-speed');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           
            // // Variables used then API url uses latitude/longitude
            // let getGeo = position.coords;
            // lat = getGeo.latitude;
            // lon = getGeo.longitude;

            
            let typingTimer;
            let typingInterval = 1000;
            document.getElementById('city').addEventListener('input', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    fetchWeather();
                },typingInterval);
            })


            
            const fetchWeather = () => {

                // calling API by City and APIkey
                let defaultCity = 'Arequipa';
                let city = document.getElementById('city').value || defaultCity;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c0be1cd5baacdaf0cec5205f8c340abc`
                console.log(url);

                fetch(url)
                    .then( response => {return response.json()})
                    .then( data => {
                        
                        // Setting dinamic content and weather variables 
                        let temp = Math.round(data.main.temp);
                        tempValue.textContent = `${temp} °C `;
                        
                        let desc = data.weather[0].description;
                        tempDescription.textContent = desc.toUpperCase();
                    
                        location.textContent = data.name;

                        wind_speed.textContent = data.wind.speed + ' m/s';

                        // // Static icons
                        // let iconCode = data.weather[0].icon;
                        // const urlIcon = ` https://openweathermap.org/img/wn/${iconCode}@2x.png`

                        // Dynamic icons

                        console.log(data.weather[0].main)
                        switch (data.weather[0].main) {
                            case 'Thunderstorm':
                            animatedIcon.src='icons/animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                            case 'Drizzle':
                            animatedIcon.src='icons/animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                            case 'Rain':
                            animatedIcon.src='icons/animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                            case 'Snow':
                                animatedIcon.src='icons/animated/snowy-6.svg'
                                console.log('NIEVE');
                            break;                        
                            case 'Clear':
                                animatedIcon.src='icons/animated/day.svg'
                                console.log('LIMPIO');
                            break;
                            case 'Atmosphere':
                                animatedIcon.src='icons/animated/weather.svg'
                                console.log('ATMOSFERA');
                                break;  
                            case 'Clouds':
                                animatedIcon.src='icons/animated/cloudy-day-1.svg'
                                console.log('NUBES');
                                break;  
                            default:
                                animatedIcon.src='icons/animated/cloudy-day-1.svg'
                                console.log('por defecto');
                        }



                    })
                    .catch(error => {
                        console.log(error)
                    })
                }  

           

                
            
        });
    }


})


