import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen"
import SearchScreen from "./SearchScreen"

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });


const MainNavigator = createStackNavigator(
  {
    Login: { 
      screen: LoginScreen,
    },
    Main: { 
      screen: MainScreen,
      navigationOptions: {
        headerLeft: () => null
      }
    },
    Search: { 
      screen: SearchScreen,
      navigationOptions: {
        headerShown: true,
      }
     },
    // ItemList: { screen: ListScreen },
    // ItemDetails: { scree: DetailsScreen }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
        <Navigation/>
    );
  }
}


