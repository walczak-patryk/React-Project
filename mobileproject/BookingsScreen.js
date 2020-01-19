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
    return (
    <View >
        <Text>{details.booking_id}</Text>
        <Text>{details.start_date}</Text>
        <Text>{details.type}</Text>
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
        fetch('http://192.168.0.122:3004/bookings')
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
})