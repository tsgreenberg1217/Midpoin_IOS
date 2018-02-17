import React, {Component} from 'react'
import {TextInput,Text, View} from 'react-native'

class Addresses extends Component{
  constructor(){
    super()
    this.state = {
      addresses: [{location:''},{location:''}]
    }
  }
  render(){
    const inputs  = this.state.addresses.map( (address, i) =>
      <TextInput
        style={{height: 40}}
        placeholder="Enter location here"
      />)

    return(
      <View>
      {inputs}
      </View>
    )
  }
}
export default Addresses
