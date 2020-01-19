import React from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity 
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';


export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedStartDate: null,
          selectedEndDate: null,
          showStartCalendar: false,
          showEndCalendar: false,
          city: null
        };
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
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

    cityChangeHandler(event){
        this.setState({
            city: event.target.value
        })
    }


    
    static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.service });

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            
            <SafeAreaView>
                <View style={styles.container}>
                    <Text>Service: {this.props.navigation.getParam('service')}</Text>
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
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
        marginBottom: -20
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
    }
})