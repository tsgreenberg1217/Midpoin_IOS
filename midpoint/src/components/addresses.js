import React, {Component} from 'react'
import {TextInput,Text, View, Button, ScrollView} from 'react-native'
import {StackNavigator} from 'react-navigation';
import Map from './map'
import Header from './header'


class Addresses extends Component{
  constructor(){
    super()
    this.state = {
      addresses: [{location:''},{location:''}]
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  handleAddressChange(text,index){
    this.setState({
      addresses: [
        ...this.state.addresses.slice(0,index),
        {location:text},
        ...this.state.addresses.slice(index+1)
      ]
    }, () => console.log(this.state.addresses))
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
      <View style={{flex:1}}>
      <Header headerText = {'Midpoints'}/>
      <ScrollView>
      <View style = {{alignItems: 'center'}}>
      {inputs}
      <Button
      onPress = {()=> this.setState({addresses: [...this.state.addresses, {location:''}]})}
      title = 'Add Addresses'
      style = {styles.buttonStyle}/>

      <Button
      onPress = {()=>this.props.navigation.navigate('Map')}
      title = 'Lets Meet!'
      style = {styles.buttonStyle}/>
      </View>
      </ScrollView>
      </View>
    )
  }
}

const styles = {
  buttonStyle:{
    backgroundColor: 'red'
  }
}
export default Addresses
