import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen"
import SearchScreen from "./SearchScreen"

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });


const MainNavigator = createStackNavigator({
  Home: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Search: { screen: SearchScreen },
  // ItemList: { screen: ListScreen },
  // ItemDetails: { scree: DetailsScreen }
});

const App = createAppContainer(MainNavigator);

export default App;


