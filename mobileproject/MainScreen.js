import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";


export default class LoginScreen extends React.Component{
    state = {
        service: ""
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title="Flatly" onPress={() => {this.setState({service: "Flatly"}); navigate("Search", {service : this.state.service})}}/>
                <Button title="Carly"  onPress={() => {this.setState({service: "Carly" }); navigate("Search", {service : this.state.service})}}/>
                <Button title="Parkly" onPress={() => {this.setState({service: "Parkly"}); navigate("Search", {service : this.state.service})}}/>
                <Text>Service: {this.state.service}</Text>
            </View>
        );
    }
}