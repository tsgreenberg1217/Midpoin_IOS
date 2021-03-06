import React, {Component} from 'react'
import {TextInput,Text, View, Button, ScrollView, Modal, ActivityIndicator} from 'react-native'
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
      addresses: [{location:''},{location:''}],
      loading: false
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
      // use the midpoint to fetch yelp results
      fetch(`https://mymidpointserver.herokuapp.com/api/v1/adapters`, body)
      .then(res => res.json())
      .then(json =>{
        // sort by rating for top 6 places
        let places = json.businesses.sort(function(a,b){return b.rating-a.rating}).slice(0,6)
        // format for component
        let formatedPlaces = places.map(loc => {return {title:loc.name, description: loc.url, coordinates: loc.coordinates} })
        // got to next screen and send data as props to map component

        this.goToMap(midpoint,formatedPlaces)
      })
    })
  }

  goToMap(midpoint,formatedPlaces){
    this.setState({
      loading:false
    },
    () => this.props.navigation.navigate('Map',{
      midpoint:midpoint,
      places: formatedPlaces
    })
   )
  }

  startLoader(addresses){

    this.setState({
      loading: true
    },this.startAddresSubmit(addresses))
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
          <Modal
          visible = {this.state.loading}
          animationType = {'fade'}>
            <View style = {[styles.container, styles.horizontal]}>
            <ActivityIndicator size = "large" color = "#0000ff"/>
            </View>
          </Modal>
          {inputs}
          <Button
          onPress = {()=> this.setState({addresses: [...this.state.addresses, {location:''}]})}
          title = 'Add Addresses'
          style = {styles.buttonStyle}/>

          <Button
          onPress = {() => this.startLoader(this.state.addresses)}
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
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
}
export default Addresses
