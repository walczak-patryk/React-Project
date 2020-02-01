import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TextInput,
  SafeAreaView, 
  StatusBar, 
  Alert
} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';

export default class LoginScreen extends React.Component{
    constructor(props) {
      super(props);

      this.state = { 
        token: "",
        username: "",
        password: ""
      }

      this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(e) {
        e.preventDefault();
        this.setState({error: false})
        fetch('http://minibookly.us-east-1.elasticbeanstalk.com/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
           
        })
        .then(response => {
        if (response.status == 404 || response.status == 401) {
            Alert.alert(
              'Access denied',
              'Invalid username or password',
              [
                {text: 'OK'},
              ],
              {cancelable: true},
            )
            return null;
        }
        else {
            return response.json();
          }
        })
        .then(responseData => {
          if (responseData != null) {
            this.setState({token: responseData.jwt});
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Main',
                  params: {token: this.state.token}
                }),
              ],
            }))
          } 
        })
    }
    
    render() {
        return (
          <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Bookly</Text>
                <Text style={styles.credentialsText}>Username:</Text>
                <TextInput style={styles.input} onChangeText={(value) => this.setState({username: value})}/>
                <Text style={styles.credentialsText}>Password:</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
                <View style={styles.logButton}>
                  <Button title="Sign in" onPress={this.loginHandler}/>
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
    paddingLeft: 5,
  },
  logButton: {
    width: 150,
    padding: 10,
    margin: 30,
  }
});