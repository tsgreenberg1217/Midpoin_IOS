const keys = require('../../config/keys')
findCoordinates = (address) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.googleKey}`)
  .then(res => res.json())
  .then(json =>{
    return {lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng}
  })
.catch(error => this.handleError())
}

export default findCoordinates
