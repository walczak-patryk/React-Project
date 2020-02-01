import React from "react";
import {
    Text, 
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";


function cancelBooking(booking_id, token) {
    fetch('http://minibookly.us-east-1.elasticbeanstalk.com/bookings', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authentication': 'Bearer ' + token
        },
        body: JSON.stringify(booking_id)
    })
}

function Item({ details }) {
    return (
    <View style={styles.booking}>
        {details.type == 'car' &&
        <View style={styles.car}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.booking_id, this.props.navigation.getParam('token'))}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {details.type == 'flat' &&
        <View style={styles.flat}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.booking_id, this.props.navigation.getParam('token'))}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {details.type == 'parking' &&
        <View style={styles.parking}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(details.booking_id, this.props.navigation.getParam('token'))}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
    </View>
    );
}

export default class BookingsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookings: [],
            isFetching: false
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
                'Authentication': 'Bearer ' + this.props.navigation.getParam('token')
            },
        })
        .then(response => response.json())
        .then(response => this.setState({ bookings: response}))
        .then(() => this.setState({isFetching: false}));
    }

    render() {
        return(
            <View style={styles.container}>
                {this.state.isFetching &&
                <ActivityIndicator style={styles.indicator} size="large"/>}
                {this.state.isFetching == false && (this.state.bookings.length > 0 ?
                <FlatList
                    data={this.state.bookings}
                    renderItem={({ item }) => <Item details={item} />}
                    keyExtractor={item => item.booking_id.toString()}
                    contentContainerStyle={{ paddingBottom: 20}}
                />:
                <Text style={styles.text}>You have no bookings yet</Text>
                )}
                
            </View>   
        )
    }
}

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
        backgroundColor: '#BC807C',
        borderRadius: 7,
        padding: 5
    },
    flat: {
        backgroundColor: '#77A0B5',
        borderRadius: 7,
        padding: 5
    },
    parking: {
        backgroundColor: '#8EB28D',
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
