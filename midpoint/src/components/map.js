/*global google*/
import React from 'react'
import {StyleSheet,Text, View, Button} from 'react-native'
import MapView from 'react-native-maps';
import {StackNavigator} from 'react-navigation';



class Map extends React.Component{
  render(){
    return(
      <View style = {styles.container}>
        <MapView style = {styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
        <MapView.Marker
          coordinate= {{
            latitude: 37.78824,
            longitude: -122.4323,
          }}
          title = {"Shop"}
          description= {"Cool things"}
        />
        </MapView>
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
