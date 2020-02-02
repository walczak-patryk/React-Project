import React from "react";
import {
    Text, 
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";

function Item({ details, token, service }) {
    return (
    <View style={styles.booking}>
        {service == 'Carly' &&
        <View style={styles.car}>
            <Text>{details.id}</Text>
            <Text>{details.startDateTime}</Text>
            <Text>{details.active }</Text>
            <Text>{details.itemType}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {service == 'Flatly' &&
        <View style={styles.flat}>
            <Text>{details.id}</Text>
            <Text>{details.startDateTime}</Text>
            <Text>{details.active}</Text>
            <Text>{details.itemType}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cancel booking</Text>
            </TouchableOpacity>
        </View>}
        {service == 'Parkly' &&
        <View style={styles.parking}>
            <Text>{details.id}</Text>
            <Text>{details.startDateTime}</Text>
            <Text>{details.active}</Text>
            <Text>{details.itemType}</Text>
            <TouchableOpacity style={styles.button}>
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
            isFetching: false
        }
    }


    render() {
        return(
            <View style={styles.container}>
                <Text>Items list:</Text>
                {this.state.isFetching &&
                <ActivityIndicator size="large"/>}
                {this.state.isFetching == false && ( this.state.items.length > 0 ?
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <Item details={item} token={this.state.token} service={this.state.service} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20}}
                />:
                <Text style={styles.text}>No items match the search criteria</Text>
                )}
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