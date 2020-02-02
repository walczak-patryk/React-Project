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

export default class SearchScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          Service: this.props.navigation.getParam('service'),
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

    componentDidUpdate(){
    }

    getItems() {
        if (this.state.priceto < this.state.pricefrom)
            this.setState({priceto: this.state.pricefrom})
        const token = this.props.navigation.getParam('token');
        if(this.state.Service == "Flatly")
            fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/flats?&city=${encodeURIComponent(this.state.city)}&address=${encodeURIComponent(this.state.address)}&selectedStartDate=${encodeURIComponent(this.state.selectedStartDate)}&selectedEndDate=${encodeURIComponent(this.state.selectedEndDate)}&pricefrom=${encodeURIComponent(this.state.pricefrom)}&priceto=${encodeURIComponent(this.state.priceto)}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
        else if(this.state.Service == "Carly")
            fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/cars?city=${encodeURIComponent(this.state.city)}&address=${encodeURIComponent(this.state.address)}&selectedStartDate=${encodeURIComponent(this.state.selectedStartDate)}&selectedEndDate=${encodeURIComponent(this.state.selectedEndDate)}&pricefrom=${encodeURIComponent(this.state.pricefrom)}&priceto=${encodeURIComponent(this.state.priceto)}&brand=${encodeURIComponent(this.state.brand)}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
        else
            fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/parkly?city=${encodeURIComponent(this.state.city)}&address=${encodeURIComponent(this.state.address)}&selectedStartDate=${encodeURIComponent(this.state.selectedStartDate)}&selectedEndDate=${encodeURIComponent(this.state.selectedEndDate)}&pricefrom=${encodeURIComponent(this.state.pricefrom)}&priceto=${encodeURIComponent(this.state.priceto)}&brand=${encodeURIComponent(this.state.brand)}&number=${encodeURIComponent(this.state.number)}&is247=${encodeURIComponent(this.state.is247)}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
        .then(response => {
            if(response.status != 200){
                Alert.alert(
                    'Request failed',
                    'Error' + response.status,
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                  )
                return null;
            }
            else
                return response.json();
        })
        .then(response => {
            if(response != null){
                this.props.navigation.navigate('ItemList', {token: token, service: this.state.Service, items : response});
            }
        })
    }
    
    static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.service });

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
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
                    <View style={styles.switchView}>
                        <TextInput 
                            style={styles.priceInput} 
                            placeholder="Price from" 
                            placeholderTextColor="#4F4F4F" 
                            name="pricefrom" 
                            value={this.state.pricefrom}
                            keyboardType="numeric" 
                            maxLength={10}
                            onChangeText={(value) => this.setState({pricefrom: value})}
                        />
                        <Text style={styles.priceText}>PLN</Text>
                    </View>
                    <View style={styles.switchView}>
                        <TextInput 
                            style={styles.priceInput} 
                            placeholder="Price to" 
                            placeholderTextColor="#4F4F4F" 
                            name="priceto" 
                            value={this.state.priceto}
                            keyboardType="numeric" 
                            maxLength={10}
                            onChangeText={(value) => this.setState({priceto: value})}
                        />
                        <Text style={styles.priceText}>PLN</Text>
                    </View>
                    {this.state.Service == "Parkly" &&
                    <View>
                        <View style={styles.pickerView}>
                            <View style={{flex:.6}}>
                                <Text style={styles.switchText}> Number of spots:</Text>
                            </View>
                            <View style={{flex:.5}}>
                                <Picker
                                    selectedValue={this.state.number}
                                    onValueChange={(itemValue) =>
                                        this.setState({number: itemValue})}
                                >
                                    <Picker.Item label="1" value={1}/>
                                    <Picker.Item label="2" value={2}/>
                                    <Picker.Item label="3" value={3}/>
                                    <Picker.Item label="4" value={4}/>
                                    <Picker.Item label="5" value={5}/>
                                    <Picker.Item label="6" value={6}/>
                                    <Picker.Item label="7" value={7}/>
                                    <Picker.Item label="8" value={8}/>
                                    <Picker.Item label="9" value={9}/>
                                </Picker>
                            </View>
                        </View>
                        
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
    priceInput: {
        lineHeight: 40,
        fontSize: 20,
        paddingLeft: 5
    },
    priceText: {
        lineHeight: 40,
        fontSize: 20,
        paddingRight: 10
    }
})