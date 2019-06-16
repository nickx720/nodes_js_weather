const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhvbmkiLCJhIjoiY2p3ZzBnazdiMWZ4ZzN5bzd4d2ZndGNlaiJ9.NZTZ0sDYU8ER_ZrhEA1Z2w&limit=1';

    request({ url, 'json': true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another Search',undefined)
        } else {
            callback(undefined, {
                'latitude': response.body.features[0].center[1],
                'longitude': response.body.features[0].center[0],
                'location': response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;