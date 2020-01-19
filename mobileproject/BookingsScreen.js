import React from "react";
import {
    Text, 
    SafeAreaView,
    FlatList,
    StyleSheet,
    StatusBar,
    View
} from "react-native";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
];


function Item({ details }) {
return (
    <View >
    <Text>{details.booking_id}</Text>
    <Text>{details.start_date}</Text>
    <Text>{deails.type}</Text>
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
        fetch('http://192.168.0.1:3004/bookings')
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
                    keyExtractor={item => item.booking_id}
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