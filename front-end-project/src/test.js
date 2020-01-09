import React from 'react';
import Booking from './Booking'
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

        fetch('http://localhost:3004/bookings')
            .then(response => response.json())
            .then(data => this.setState({bookings: data}))
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
            <div className="Content">
                {this.element("Booking id:")}
                {this.element("User id:")}
                {this.element("Item id:")}
                {this.element("Item type:")}
                {this.element("Active:")}
                {this.element("Start date:")} 
                {this.element("Details:")} 
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

export default Test