import React from "react";
import {
    Text, 
    SafeAreaView,
    FlatList,
    StyleSheet,
    StatusBar,
    View
} from "react-native";


function Item({ details }) {
    const type = details.type
    return (
    <View style={styles.booking}>
        {details.type == 'car' &&
        <View style={styles.car}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <Text>{details.item_info}</Text>
        </View>}
        {details.type == 'flat' &&
        <View style={styles.flat}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <Text>{details.item_info}</Text>
        </View>}
        {details.type == 'parking' &&
        <View style={styles.parking}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <Text>{details.item_info}</Text>
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
        fetch('http://192.168.1.104:3004/bookings')
        .then(response => response.json())
        .then(response => this.setState({ bookings: response}))
        .then(() => this.setState({isFetching: false}));
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text>Bookings list:</Text>
                {this.state.isFetching ?
                <Text>Loading ...</Text>:
                <FlatList
                    data={this.state.bookings}
                    renderItem={({ item }) => <Item details={item} />}
                    keyExtractor={item => item.booking_id.toString()}
                />}
            </SafeAreaView>   
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    booking: {
        width: '90%',
        alignSelf: "center",
        margin: 10,
        
    },
    car: {
        backgroundColor: '#C13838',
        borderRadius: 7,
        paddingLeft: 5
    },
    flat: {
        backgroundColor: '#008DC9',
        borderRadius: 7,
        paddingLeft: 5
    },
    parking: {
        backgroundColor: '#4FAF4F',
        borderRadius: 7,
        paddingLeft: 5
    }
})
