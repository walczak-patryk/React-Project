import React from 'react';
import { Link } from 'react-router-dom'
import './Booking.css';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        props.booking.start_date = new Date(props.booking.start_date);
    }
    element = (value) => {
        return (
            <div className="Element">{value}</div>
        )
    }

    render() {
        const {booking} = this.props

        const Button = (
            <Link to={`bookings/${booking.booking_id}`}>
                <button>XD</button>
            </Link>
        )

        return (
            <div className={this.props.className}>
                {this.element(booking.booking_id)}
                {this.element(booking.user_id)}
                {this.element(booking.item_id)}
                {this.element(booking.type)}
                {this.element(booking.active.toString())}
                {this.element(`${booking.start_date.getDate()} 
                    ${booking.start_date.getMonth()+1} ${booking.start_date.getFullYear()}`)}
                {this.element(Button)}
            </div>
        )
    }
}

export default Booking

// booking.start_date.getDate() + ' ' 
// + booking.start_date.getMonth() + ' ' 
// + booking.start_date.getFullYear()