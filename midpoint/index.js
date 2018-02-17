// knows how a component should behave and take a bunch of comps and
// make them work together
import React from 'react'
// portal to mibile device
// takes the out put on the component and places it on the screen ad provides default
import {AppRegistry} from 'react-native'
import App from './App'


// you must register one component to application

AppRegistry.registerComponent('midpoint', ()=>App)
