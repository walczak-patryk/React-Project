import React from "react";
import { 
    View,
    StyleSheet, 
    Text, 
    TextInput, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity,
    ScrollView,
    Switch,
    Picker
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';

// Should this class be named LoginScreen??
export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          Service: null,
          Items: [],
          selectedStartDate: null,
          selectedEndDate: null,
          showStartCalendar: false,
          showEndCalendar: false,
          city: null,
          address: null,
          number: null,
          pricefrom: null,
          priceto: null,
          is247: false,
          brand: null,
        };
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.getItems = this.getItems.bind(this);
    }
     
    onStartDateChange(date) {
    this.setState({
        selectedStartDate: date,
        showStartCalendar: false
        });
    }

    onEndDateChange(date) {
    this.setState({
        selectedEndDate: date,
        showEndCalendar: false
        });
    }

    componentDidMount(){
        this.setState({Service: this.props.navigation.getParam('service')})
    }

    componentDidUpdate(){
        if (this.state.priceto < this.state.pricefrom)
            this.setState({priceto: this.state.pricefrom})
    }

    getItems() {
        if(this.state.Service == "Flatly")
            fetch('http://192.168.0.122:3004/flats', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': 'Bearer ' + this.props.navigation.getParam('token')
                },
                body: JSON.stringify(
                    this.state.Service,
                    this.state.city,
                    this.state.address,
                    this.state.selectedStartDate,
                    this.state.selectedEndDate,
                    this.state.pricefrom,
                    this.state.priceto
                    )
            })
        else if(this.state.Service == "Carly")
            fetch('http://192.168.0.122:3004/cars', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': 'Bearer ' + this.props.navigation.getParam('token')
                },
                body: JSON.stringify(
                    this.state.Service,
                    this.state.city,
                    this.state.address,
                    this.state.selectedStartDate,
                    this.state.selectedEndDate,
                    this.state.pricefrom,
                    this.state.priceto,
                    this.state.brand
                    )
            })
        else
            fetch('http://192.168.0.122:3004/parkings', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': 'Bearer ' + this.props.navigation.getParam('token')
                },
                body: JSON.stringify(
                    this.state.Service,
                    this.state.city,
                    this.state.address,
                    this.state.selectedStartDate,
                    this.state.selectedEndDate,
                    this.state.pricefrom,
                    this.state.priceto,
                    this.state.number,
                    this.state.is247
                    )
            })
        .then(response => response.json())
        .then(response => this.setState({ Items: response}))
        .then(this.props.navigation.navigate('ItemList', {List : this.state.Items}))
    }
    
    static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.service });

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text>Service: {this.state.Service}</Text>
                    <Text>City: {this.state.city}</Text>
                    <Text>Address: {this.state.address}</Text>
                    <Text>Start date: {startDate}</Text>
                    <Text>End date: {endDate}</Text>
                    <Text>Price from: {this.state.pricefrom} PLN</Text>
                    <Text>Price to: {this.state.priceto} PLN</Text>
                    {this.state.Service == "Parkly" &&
                    <View>
                        <Text>Number of spots: {this.state.number} </Text>
                        <Text>Is 24/7: {this.state.is247 && "Yes" || "No"} </Text>
                    </View>
                    }
                    {this.state.Service == "Carly" &&
                    <View>
                        <Text>Brand: {this.state.brand} </Text>
                    </View>
                    }
                    <TextInput 
                        style={styles.cityInput} 
                        placeholder="City" 
                        placeholderTextColor="#4F4F4F" 
                        name="city" 
                        value={this.state.city} 
                        onChangeText={(value) => this.setState({city: value})}
                    />
                    <TextInput 
                        style={styles.cityInput} 
                        placeholder="Address" 
                        placeholderTextColor="#4F4F4F" 
                        name="address" 
                        value={this.state.address} 
                        onChangeText={(value) => this.setState({address: value})}
                    />
                    <TouchableOpacity style={styles.calendar} onPress={() => {this.setState(prevState => ({showStartCalendar: !prevState.showStartCalendar}));}}>
                        <Text style={styles.calendarText}>START DATE: { startDate }</Text>
                    </TouchableOpacity>
                    {this.state.showStartCalendar &&
                    <CalendarPicker
                        onDateChange={this.onStartDateChange}
                    />}
                    <TouchableOpacity style={styles.calendar} onPress={() => {this.setState(prevState => ({showEndCalendar: !prevState.showEndCalendar}));}}>
                        <Text style={styles.calendarText}>END DATE: { endDate }</Text>
                    </TouchableOpacity>
                    {this.state.showEndCalendar &&
                    <CalendarPicker
                        onDateChange={this.onEndDateChange}
                    />}
                    <TextInput 
                        style={styles.cityInput} 
                        placeholder="Price from" 
                        placeholderTextColor="#4F4F4F" 
                        name="pricefrom" 
                        value={this.state.pricefrom}
                        keyboardType="numeric" 
                        onChangeText={(value) => this.setState({pricefrom: value})}
                    />
                    <TextInput 
                        style={styles.cityInput} 
                        placeholder="Price to" 
                        placeholderTextColor="#4F4F4F" 
                        name="priceto" 
                        value={this.state.priceto}
                        keyboardType="numeric" 
                        onChangeText={(value) => this.setState({priceto: value})}
                    />
                    {this.state.Service == "Parkly" &&
                    <View>
                        <TextInput 
                        style={styles.cityInput} 
                        placeholder="Number of spots" 
                        placeholderTextColor="#4F4F4F" 
                        name="number" 
                        value={this.state.number}
                        keyboardType="numeric" 
                        onChangeText={(value) => this.setState({number: value})}
                        />
                        <View style={styles.switchView}>
                            <Text style={styles.switchText}> Is the parking 24/7:</Text>
                            <Switch 
                                style={styles.switch} 
                                value={this.state.is247} 
                                onValueChange={(value) => this.setState({is247: value})}
                            />
                        </View>
                    </View>
                    }
                    {this.state.Service == "Carly" &&
                    <View style={styles.pickerView}>
                        <View style={{flex:.5}}>
                            <Text style={styles.switchText}> Car brand:</Text>
                        </View>
                        <View style={{flex:.5}}>
                            <Picker
                                selectedValue={this.state.brand}
                                onValueChange={(itemValue) =>
                                    this.setState({brand: itemValue})}
                            >
                                <Picker.Item label="Any" value={null}/>
                                <Picker.Item label="Mazda" value="Mazda"/>
                                <Picker.Item label="Tesla" value="Tesla"/>
                                <Picker.Item label="Nissan" value="Nissan"/>
                            </Picker>
                        </View>
                    </View>
                    }
                    <TouchableOpacity style={styles.button} onPress={this.getItems}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      //width: '85%'
    },
    button: {
        height: 100,
        width: 150,
        margin: 20,
        alignItems: 'center',
        backgroundColor:'#BCBCBC',
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 80,
    },
    buttonText: {
        height: 100,
        lineHeight: 100,
        fontSize: 28
    },
    calendar : {
        margin: 20,
        height: 40,
        backgroundColor:'#BCBCBC',
        borderRadius: 7
    },
    calendarText: {
        height: 40,
        lineHeight: 40,
        fontSize: 20,
        paddingLeft: 5,
    },
    cityInput: {
        alignSelf: 'center',
        //borderWidth: 0.5,
        borderRadius: 7,
        backgroundColor: '#BCBCBC',
        width: '89%',
        paddingLeft: 5,
        height: 40,
        lineHeight: 40,
        fontSize: 20,
        margin: 20,
    },
    switchView: {
        flexDirection: "row",
        margin: 20,
        backgroundColor:'#BCBCBC',
        height: 40,
        justifyContent: "space-between",
        borderRadius: 7,
        
    },
    switchText: {
        lineHeight: 40,
        fontSize: 20,
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },
    pickerView: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        backgroundColor:'#BCBCBC',
        borderRadius: 7,
        width: '89%',
        alignSelf: "center",
        height: 40,
        fontSize: 20
    },
})