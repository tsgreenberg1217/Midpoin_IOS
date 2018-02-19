import React, {Component} from 'react'
import {TextInput,Text, View, Button, ScrollView} from 'react-native'
import {StackNavigator} from 'react-navigation';
import Map from './map'
import Header from './header'
import {getLatLong} from '../services/findMidpoint'
import {findCoordinates} from '../services/findCoordinates'



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

  dataToMap(){
    return{
      midpoint: {latitude: 26.158147,longitude: -80.325408},
      places:[{latitude:26.158147,longitude: -80.325408, title: 'BB&T Center', description: 'GO CATS GO!!!'}]
    }
  }
  startAddresSubmit = (addresses) =>{
    addresses.map(address => findCoordinates(address.location))
    // this.props.navigation.navigate('Map',this.dataToMap())
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
