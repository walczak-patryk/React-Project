import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TextInput,
  SafeAreaView, 
  StatusBar 
} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';


const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' }),
  ],
});

export default class LoginScreen extends React.Component{
    state = {
        token: null,
        error: false
    };

    // loginHandler(e) {
    //     e.preventDefault();
    //     this.setState({error: false})
    //     fetch('http://localhost:8080/login', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(e.target.uname.value, e.target.psw.value)
            
    //     })
    //     .then(res => {
    //     if (res.status !== 201) {
    //         this.setState({error: true})
    //     } 
    //     else {
    //         this.setState({token: res.body})
    //     }
    //     })
    // }

    
    render() {
        //const { navigate } = this.props.navigation;
        return (
          <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Bookly</Text>
                <Text style={styles.credentialsText}>Username:</Text>
                <TextInput style={styles.input}/>
                <Text style={styles.credentialsText}>Password:</Text>
                <TextInput style={styles.input}/>
                <View style={styles.logButton}>
                  <Button title="Sign in" onPress={() => this.props.navigation.dispatch(resetAction)}/>
                </View>
            </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 50,
    color: '#5B5B5B'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  credentialsText: {
    fontSize: 25,
    margin: 5,
    marginTop: -5,
    color: '#5B5B5B'
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 20,
    borderWidth: 0.5,
    borderColor: '#B3B3B3',
    borderRadius: 10,
    margin: 10,
    marginBottom: 30,
  },
  logButton: {
    width: 150,
    padding: 10,
    margin: 30,
  }
});