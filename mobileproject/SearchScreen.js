import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

export default class LoginScreen extends React.Component{
    

    render() {
        return (
            <View>
                <Text>Service: {this.props.navigation.getParam('service')}</Text>
            </View>
        );
    }
}