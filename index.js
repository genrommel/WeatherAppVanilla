window.addEventListener('load', () => {
    let lon;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            let getGeo = position.coords;
            lat = getGeo.latitude;
            lon = getGeo.longitude;


            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d17f6fe4cc2147058d222435232410`
            console.log(url);
        });
    }


})