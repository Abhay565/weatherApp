import axios from "axios";

const API_KEY = "b1630ee755ae409f8ee50201241204";

const forecastEndPoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndPoint = params => `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;


const apiCall = async (endpoint:any ) =>{
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
   
const response = await axios.request(options);

return response.data;

    }catch(err){
        console.log("error--",err);
        return null
    }
}

export const fetchWeatherForecast = params => {
    let forcastUrl =  forecastEndPoint(params);
    return apiCall(forcastUrl);
}

export const fetchLocations = params => {
    let forcastUrl =  locationEndPoint(params);
    return apiCall(forcastUrl);
}