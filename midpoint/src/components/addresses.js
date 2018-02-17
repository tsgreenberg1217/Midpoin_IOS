import React, {Component} from 'react'
import {TextInput,Text} from 'react-native'

class Addresses extends Component{
  constructor(){
    super()
    this.state = {
      addresses: [{location:''}]
    }
  }
  render(){
    const inputs  = this.state.addresses.map( (address, i) =>
      <TextInput
        style={{height: 40}}
        placeholder="Enter location here"
      />)

    return(
      <div></div>
    )
  }
}
export default Addresses
