/*global google*/
import React from 'react'
import {StyleSheet,Text, View, Button} from 'react-native'
import MapView from 'react-native-maps';
import {StackNavigator} from 'react-navigation';



class Map extends React.Component{
  constructor(){
    super()
    this.state={
      midpoint:{latitude:37.78825,longitude: -122.4324},
      places:[{latitude:37.78825,longitude: -122.4324, title: 'Shop', description: 'Cool things'}]
    }
  }
  componentDidMount(){
  }
  render(){
    const { params } = this.props.navigation.state;
    const midpoint = params ? params.midpoint : null;
    const places = params ? params.places : null;

    const markedPlaces = places.map((place,i) =>{
      return <MapView.Marker
      key = {i}
      coordinate = {place.coordinates}
      title = {place.title}
      description = {place.description}/>
    })
    return(
      <View style = {styles.container}>
        <MapView style = {styles.map}
          region={{
            latitude: midpoint.latitude,
            longitude: midpoint.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
        {markedPlaces}
        </MapView>
        <Button
        onPress = {()=>console.log('hello')}
        title = 'props'
        />
        <Button
        onPress = {()=>this.props.navigation.goBack()}
        title = 'Back'
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map
