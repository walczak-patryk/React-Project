import React from "react";
import {
    Text, 
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";

function book(token, details, startDate, endDate) {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var date = day + '/' + month + '/' + year;
    fetch('http://minibookly.us-east-1.elasticbeanstalk.com/Parkly', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            id: 1, 
            parkingId: details.id,
            parkingSpotId: 0,
            userId: 0,
            bookDate: date,
            paidAmount: 0,
            startDate: startDate,
            endDate: endDate,
            active: true
        })
    })
    .then(response => { 
        if(response.status == 200){
            Alert.alert(
                'Your booking is complete',
                'Thank You for using Bookly',
                [
                  {text: 'OK'},
                ],
                {cancelable: true},
            );
            this.props.navigation.navigate("MyBookings", {token : this.state.token});
        }
        else{
            Alert.alert(
                'An error occured',
                'Try again later',
                [
                  {text: 'OK'},
                ],
                {cancelable: true},
            );
            return null;
        }
    })
}


function Item({ details, token, service, startDate, endDate }) {
    return (
    <View style={styles.booking}>
        {service == 'Carly' &&
        <View style={styles.car}>
            <Text>{details.id}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
        </View>}
        {service == 'Flatly' &&
        <View style={styles.flat}>
            <Text>{details.id}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
        </View>}
        {service == 'Parkly' &&
        <View style={styles.parking}>
            <Text>Parking Id: {details.id}</Text>
            <Text>Name: {details.name}</Text>
            <Text>City: {details.city}</Text>
            <Text>Zip code: {details.zip}</Text>
            <Text>Address: {details.address}</Text>
            <Text>Price: {details.price} PLN/day</Text>
            <Text>Description: {details.description}</Text>
            <Text>Number of spots: {details.nspots}</Text>
            {details.active ?
            <Text>Active: True</Text>:
            <Text>Active: False</Text>}
            <TouchableOpacity style={styles.button} onPress={() => book(token, details, startDate, endDate)}>
                <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
        </View>}
    </View>
    );
}


export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: this.props.navigation.getParam('token'),
            service: this.props.navigation.getParam('service'),
            items: this.props.navigation.getParam('items'),
            startDate: this.props.navigation.getParam('startDate'),
            endDate: this.props.navigation.getParam('endDate')
        }
    }


    render() {
        return(
            <View style={styles.container}>
                {this.state.items.length > 0 ?
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => 
                        <Item 
                            details={item} 
                            token={this.state.token} 
                            service={this.state.service} 
                            startDate={this.state.startDate}
                            endDate={this.state.endDate} 
                        />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20}}
                />:
                <Text style={styles.text}>No items match the search criteria</Text>
                }
            </View>   
        )
    }
}


const styles = StyleSheet.create({
    container: {
    },
    booking: {
        width: '90%',
        alignSelf: "center",
        margin: 10,
    },
    car: {
        backgroundColor: '#E8DBC3',
        borderRadius: 7,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BCBCBC'
    },
    flat: {
        backgroundColor: '#ABE3D0',
        borderRadius: 7,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BCBCBC'
    },
    parking: {
        backgroundColor: '#DFE1E3',
        borderRadius: 7,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BCBCBC'
    },
    whitespace: {
        margin: 80
    },
    button: {
        alignSelf: "center",
        width: "50%",
        borderRadius: 10,
        backgroundColor: '#BCBCBC',
        marginTop: 10,
        padding: 5
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 20
    },
    text: {
        alignSelf: "center",
        fontSize: 20,
        margin: 30
    }
})