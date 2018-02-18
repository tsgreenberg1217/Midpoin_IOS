/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Addresses from './src/components/addresses'
import Map from './src/components/map'
import { StackNavigator } from 'react-navigation';


const RootStack = StackNavigator({
  Home: {
    screen: Addresses,
  },
  Map: {
    screen: Map,
  }
},
{
  initialRouteName: 'Home'
}
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
