import React, {Component} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import MapView from 'react-native-maps';


class Map extends Component{
  constructor(){
    super()
    this.state ={
    }
  }
  render(){
    return(
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    )
  }
}
export default Map
