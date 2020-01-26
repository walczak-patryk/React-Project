import React from "react";
import {
    Text, 
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";


function Item({ details }) {
    return (
    <View style={styles.booking}>
            <Text>{details.booking_id}</Text>
            <Text>{details.start_date}</Text>
            <Text>{details.type}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
    </View>
    );
}


export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isFetching: false
        }
    }

    componentDidMount() {
        this.setState({items: this.props.navigation.getParam('List')})
    }


    render() {
        return(
            <View style={styles.container}>
                <Text>Items list:</Text>
                {this.state.isFetching ?
                <ActivityIndicator size="large"/>:
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <Item details={item} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20}}
                />}
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
})