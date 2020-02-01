import React from 'react';
import Booking from './js/Booking'
import { withRouter } from "react-router-dom";
import './test.css'

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: null,
			isLoading: false
        }
    }

    componentDidMount() {
        this.loadBookings();
    }
    
    loadBookings() {
		this.setState({
            isLoading: true
        });
        //var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        //    targetUrl = 'http://localhost:8080/bookings/1'
        //fetch('http://localhost:3004/bookings')
        fetch('http://localhost:8080/bookings/1', { mode: 'no-cors'})
        //fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            //.then(data => this.setState({bookings: data}))
            .then(() => this.setState({isLoading: false}));
    }

    element = (value) => {
        return (
            <div className="Element">{value}</div>
        )
    }

    render () {
        if(this.state.isLoading) {
        	return <p>Loading...</p>
        }

        const header = (
            <div>
                <div className="Title">
                    <h2>Bookly - Reservation History</h2>
                </div>
                <div className="Content">
                    {this.element("Booking id:")}
                    {this.element("User id:")}
                    {this.element("Item id:")}
                    {this.element("Item type:")}
                    {this.element("Active:")}
                    {this.element("Start date:")} 
                    {this.element("Details:")} 
                </div>
            </div>
        )

        if(this.state.bookings) {
            const listBookings = (
                this.state.bookings.length === 0 ? <div>No bookings</div> :
                <div className="Wrapper">
                    {header}
                    {this.state.bookings.map(item => (
                        <Booking booking={item} className="Booking"/>
                    ))}
                </div>
            )

            return (
                <div>
                    {listBookings}
                </div>
            )
        }
        
        return (
            <div>
                <a>XD</a>
            </div>
        )
    }
}

export default withRouter(Test)