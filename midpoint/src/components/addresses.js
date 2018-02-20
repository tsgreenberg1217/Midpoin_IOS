import React, {Component} from 'react'
import {TextInput,Text, View, Button, ScrollView} from 'react-native'
import {StackNavigator} from 'react-navigation';
import Map from './map'
import Header from './header'
// import {getLatLong} from '../services/findMidpoint'
// import {findCoordinates} from '../services/findCoordinates'
// import {fetchToYelp} from '../services/yelpAPI'
const keys = require('../../config/keys')



class Addresses extends Component{
  constructor(){
    super()
    this.state = {
      addresses: [{location:''},{location:''}]
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  componentWillUnmount(){
    console.log('Addresses unmounted')
  }


  handleAddressChange(text,index){
    this.setState({
      addresses: [
        ...this.state.addresses.slice(0,index),
        {location:text},
        ...this.state.addresses.slice(index+1)
      ]
    })
  }

  getLatLong = (array) =>{
    getMidArray = (lat,long) =>{
      const pi = Math.PI

      const radianLat = lat * pi/180
      const radianLong  = long * pi/180
      const calcX = Math.cos(radianLat) * Math.cos(radianLong)
      const calcY = Math.cos(radianLat) * Math.sin(radianLong)
      const calcZ = Math.sin(radianLat)

      return {x:calcX, y:calcY, z:calcZ}

    }

   const avg = array.map(function(pair){
     return getMidArray(pair.lat, pair.lng)
   })
   const count = avg.length
   let x = 0
   let y = 0
   let z = 0
    avg.forEach(function(cord){
      x += cord.x
      y += cord.y
      z += cord.z
    })

   let totalArray = [x,y,z]
   const avgArray = totalArray.map(function(coord){
     return coord/count
   })
   const longitude = Math.atan2(avgArray[1],avgArray[0])
   const hyp = Math.sqrt(avgArray[0] * avgArray[0] + avgArray[1] * avgArray[1])
   const latitude = Math.atan2(avgArray[2], hyp)
   const longitude_degrees = longitude * 180/Math.PI
   const latitude_degrees = latitude * 180/Math.PI

   return {latitude: latitude_degrees, longitude: longitude_degrees }
 }

  dataToMap(){
    return{
      midpoint: {latitude: 26.158147,longitude: -80.325408},
      places:[{latitude:26.158147,longitude: -80.325408, title: 'BB&T Center', description: 'GO CATS GO!!!'}]
    }
  }




  startAddresSubmit = (addresses) =>{
    // formats all the locations to url strings
    const urls = addresses.map(address => `https://maps.googleapis.com/maps/api/geocode/json?address=${address.location}&key=${keys.googleKey}`)
    // maps everything to promises to later be resolved
    var promises = urls.map((url) =>
       fetch(url).then(res => res.json()).then(json => {return json})
    )
    // Resolves the array of promises and starts to operate on the data
    Promise.all(promises).then((results) => {
      var locations = results.map(result => {
        // gets the data
        return {lat: result.results[0].geometry.location.lat, lng: result.results[0].geometry.location.lng}
      })
      // find the midpoint between the addresses
      var midpoint = this.getLatLong(locations)

      const body = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: midpoint.latitude,
          lng: midpoint.longitude,
          term: 'restaurant'
        })
      }
      fetch(`https://mymidpointserver.herokuapp.com/api/v1/adapters`, body)
      .then(res => res.json())
      .then(json =>{
        let places = json.businesses.sort(function(a,b){return b.rating-a.rating}).slice(0,6)
        let formatedPlaces = places.map(loc => {return {title:loc.name, description: loc.url, coordinates: loc.coordinates} })

        this.props.navigation.navigate('Map',{
          midpoint:midpoint,
          places: formatedPlaces

        })
      })



    })
  }

  render(){
    const inputs  = this.state.addresses.map( (address, i) =>
      {return<TextInput
        key = {i}
        style={{height: 40}}
        placeholder="Enter location here"
        onChange = {(e) => this.handleAddressChange(e.nativeEvent.text,i)}
      />})

    return(
        <ScrollView>
          <View style = {{alignItems: 'center'}}>
          {inputs}
          <Button
          onPress = {()=> this.setState({addresses: [...this.state.addresses, {location:''}]})}
          title = 'Add Addresses'
          style = {styles.buttonStyle}/>

          <Button
          onPress = {() => this.startAddresSubmit(this.state.addresses)}
          title = 'Lets Meet!'
          style = {styles.buttonStyle}/>
          </View>
        </ScrollView>
    )
  }
}

const styles = {
  buttonStyle:{
    backgroundColor: 'red'
  }
}
export default Addresses
