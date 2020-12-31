const request = require('postman-request');

//use mapbox api to get the latitude and logitude details from the given address or city name...

const geocode = (address, callback) => {
    const geoUrl =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZpLXZ6bTA1IiwiYSI6ImNraXp0NGEzYjA0Ym8yd3FqNTEwNzBmbXgifQ.2NqfKn-d6AvI0rQwDKfQ5Q&limit=1';
    request({url:geoUrl, json:true},(error, {body:geoBody}) => {
        if (error) {
            callback('Can not connect to the Mapbox api',undefined);
        }else if(geoBody.features.length === 0){
            callback('address not found... use a different one',undefined);
        }else {
            callback(undefined,{
                latitude: geoBody.features[0].center[1],
                longitude: geoBody.features[0].center[0],
                location: geoBody.features[0].place_name
            })
        }
    })
}

// forcast funtion to be used to get the weather in a given location using lat and long... 
// this is done using weather stack api.

const forecast = (lat, long, callback) => {
    const weatherApi = 'http://api.weatherstack.com/current?access_key=6ffd457f6749e31af70fbc31e050cf68&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long);
    request({url: weatherApi, json:true},(error, {body:weatherBody}) => {
        if (error) {
            callback('low level error... can not call weather stack api',undefined);
        }else if (weatherBody.error){
            callback(weatherBody.error.info,undefined);
        }else {
            callback(undefined,weatherBody);
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}