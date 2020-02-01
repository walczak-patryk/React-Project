import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen"
import SearchScreen from "./SearchScreen"
import BookingsScreen from "./BookingsScreen"
import ListScreen from "./ListScreen"


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
    ItemList: { 
      screen: ListScreen,
      navigationOptions: {
        headerShown: true,
      } 
    },
    // ItemDetails: { scree: DetailsScreen }
    MyBookings :{
      screen: BookingsScreen,
      navigationOptions: {
        headerShown: true,
      }
    },
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


