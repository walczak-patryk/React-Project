import React from "react";
import { StyleSheet, 
    View, 
    Text, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity 
} from "react-native";

export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          token: "",
        }
    }

    componentDidMount(){
        this.setState({token: this.props.navigation.getParam('token')})
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Flatly", token : this.state.token})}}>
                        <Text style={styles.buttonText}>Flatly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Carly", token : this.state.token})}}>
                        <Text style={styles.buttonText}>Carly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Parkly", token : this.state.token})}}>
                        <Text style={styles.buttonText}>Parkly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("MyBookings", {token : this.state.token})}}>
                        <Text style={styles.buttonText}>My Bookings</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    button: {
        height: 100,
        width: 200,
        margin: 20,
        alignItems: 'center',
        backgroundColor:'#BCBCBC',
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: -20
    },
    buttonText: {
        height: 100,
        lineHeight: 100,
        fontSize: 28
    }
})