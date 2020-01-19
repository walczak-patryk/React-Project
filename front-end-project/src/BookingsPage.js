import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import './BookingsPage.css'

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null,
      isLoading: false
    }
    this.loadBookings = this.loadBookings.bind(this)
    this.element = this.element.bind(this)
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  componentDidMount() {
    console.log(this.getCookieValue("token"))
    this.loadBookings();
  }

  loadBookings() {
    this.setState({
      isLoading: true
    });

    fetch('http://localhost:8080/bookings')
      .then(response =>   response.json())
      .then(data => this.setState({ bookings: data }))
      .then(() => this.setState({ isLoading: false }));
  }

  element = (value) => {
    if (value === "Item info:") {
      const msg = "Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber"
      return (
        <div className="ElementHeader">
          {value}
          <img src="https://img.icons8.com/office/16/000000/info.png"
            onClick={() => alert(msg)}
          />
        </div>
      )
    } else {
      return (
        <div className="ElementHeader">{value}</div>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    const header = (
      <div>
        <div className="Content">
          {this.element("Booking id:")}
          {this.element("User id:")}
          {this.element("User name:")}
          {this.element("Item id:")}
          {this.element("Item type:")}
          {this.element("Item info:")}
          {this.element("Active:")}
          {this.element("Start date:")}
          {/* {this.element("Details:")} */}
        </div>
      </div>
    )

    if (this.state.bookings) {
      const listBookings = (
        this.state.bookings.length === 0 ? <div>No bookings</div> :
          <div className="Wrapper">
            {header}
            {this.state.bookings.map(item => (
              <Booking booking={item} className="Booking" key={item.booking_id} />
            ))}
          </div>
      )

      return (
        <div style={{ alignContent: "flexStart" }}>
          {listBookings}
        </div>
      )
    } else {
      return <div>Error</div>
    }

  }
}

export default withRouter(Bookings)