import React from "react";
import {
    Text, 
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";

function cancelBooking(id, token) {
    fetch('http://minibookly.us-east-1.elasticbeanstalk.com/bookings/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    this.setState({ isFetching: true });
}

function Item({ details, token }) {
    return (
    <View style={styles.booking}>
        {details.itemType == 'car' &&
        <View style={styles.car}>
            <Text>Booking Id: {details.id}</Text>
            <Text>Start time: {details.startDateTime}</Text>
            {details.active ?
            <Text>Active: True</Text>:
            <Text>Active: False</Text>}
            <Text>Type: {details.itemType}</Text>
            <Text>Details: {details.details}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.id, token)}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {details.itemType == 'flat' &&
        <View style={styles.flat}>
            <Text>Booking Id: {details.id}</Text>
            <Text>Start time: {details.startDateTime}</Text>
            {details.active ?
            <Text>Active: True</Text>:
            <Text>Active: False</Text>}
            <Text>Type: {details.itemType}</Text>
            <Text>Details: {details.details}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.id, token)}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {details.itemType == 'parking' &&
        <View style={styles.parking}>
            <Text>Booking Id: {details.id}</Text>
            <Text>Start time: {details.startDateTime}</Text>
            {details.active ?
            <Text>Active: True</Text>:
            <Text>Active: False</Text>}
            <Text>Type: {details.itemType}</Text>
            <Text>Details: {details.details}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.id, token)}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
    </View>
    );
}

class BookingsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookings: [],
            isFetching: false,
        }
        this.getBookings = this.getBookings.bind(this);
    }

    componentDidMount() {
        this.getBookings();
    }
    
    getBookings() {
        this.setState({ isFetching: true });
        fetch('http://minibookly.us-east-1.elasticbeanstalk.com/bookings', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.navigation.getParam('token')
            },
        })
        .then(response => response.json())
        .then(response => this.setState({ bookings: response.bookingForms}))
        .then(() => this.setState({isFetching: false}));
    }

    render() {
        return(
            <View style={styles.container}>
                {this.state.isFetching &&
                <ActivityIndicator style={styles.indicator} size="large"/>}
                {this.state.isFetching == false && (this.state.bookings.length > 0 ?
                <View>
                    <TouchableOpacity style={styles.Reloadbutton} onPress={this.getBookings}>
                        <Text style={styles.ReloadbuttonText}>Reload</Text>
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>User: {this.state.bookings[0].username}</Text>
                    <FlatList
                        data={this.state.bookings}
                        extraData={this.state}
                        renderItem={({ item }) => <Item details={item} token={this.props.navigation.getParam('token')} />}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20}}
                    />
                </View>:
                <Text style={styles.text}>You have no bookings yet</Text>
                )}
                
            </View>   
        )
    }
}

export default BookingsScreen;

const styles = StyleSheet.create({
    container: {
    },
    indicator: {
        marginTop: 30,
    },
    booking: {
        width: '90%',
        alignSelf: "center",
        margin: 10,
        
    },
    car: {
        backgroundColor: '#E8DBC3',
        borderRadius: 7,
        padding: 5
    },
    flat: {
        backgroundColor: '#ABE3D0',
        borderRadius: 7,
        padding: 5
    },
    parking: {
        backgroundColor: '#DFE1E3',
        borderRadius: 7,
        padding: 5
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
    },
    Reloadbutton: {
        alignSelf: "center",
        width: "90%",
        borderRadius: 10,
        backgroundColor: '#9E9891',
        height: 60,
        marginTop: 10,
        marginBottom: 10
    },
    ReloadbuttonText: {
        alignSelf: "center",
        fontSize: 30,
        lineHeight: 60
    }
})
