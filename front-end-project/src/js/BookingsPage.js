import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import '../css/BookingsPage.css'

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
      isLoading: false
    }
    this.loadBookings = this.loadBookings.bind(this)
    this.element = this.element.bind(this)
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  componentDidMount() {
    if (this.getCookieValue("token") === undefined) {
      this.props.history.push("/");
      return;
    }
    console.log("cookie 'token' value: ", this.getCookieValue("token"))
    this.loadBookings();
  }

  loadBookings() {
    this.setState({
      isLoading: true
    });

    fetch('http://localhost:3004/bookings')
      .then(response => response.json())
      .then(data => this.setState({ bookings: data }))
      .then(() => this.setState({ isLoading: false }));
  }

  handlerImgInfo = () => {

  }

  element = (value, handler) => {
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
        <div className="ElementHeader" onClick={handler}>
          {value}
        </div>
      )
    }
  }

  mySort = (a, b, predicament) => {
    if (!predicament)
      return a < b ? 1 : -1;
    else {
      return a > b ? 1 : -1;
    }
  }

  handlerB = () => {
    if (this.state.bookingIdAsc === null) {
      this.state.bookingIdAsc = false;
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.booking_id, b.booking_id, this.state.bookingIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      bookingIdAsc: !prevstate.bookingIdAsc
    }),
      console.log("booking id: ", this.state.bookingIdAsc))
    //console.log(this.state.bookingIdAsc);
  }

  handlerUId = () => {
    if (this.state.userIdAsc === null) {
      this.state.userIdAsc = false;
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.user_id, b.user_id, this.state.userIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userIdAsc: !prevstate.userIdAsc
    }),
      console.log("User id: ", this.state.userIdAsc))
  }

  hanlderUName = () => {
    if (this.state.userNameAsc === null) {
      this.state.userNameAsc = false;
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.username, b.username, this.state.userNameAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userNameAsc: !prevstate.userNameAsc
    }),
      console.log("user name: ", this.state.userNameAsc))
  }

  hanlderIID = () => {
    if (this.state.itemIdAsc === null) {
      this.state.itemIdAsc = false;
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.item_id, b.item_id, this.state.itemIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      itemIdAsc: !prevstate.itemIdAsc
    }),
      console.log("item id:", this.state.itemIdAsc))
  }

  handlerSD = () => {
    if (this.state.startDateAsc === null) {
      this.state.startDateAsc = false;
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.start_date, b.start_date, this.state.startDateAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      startDateAsc: !prevstate.startDateAsc
    }),
      console.log("start date", this.state.startDateAsc))
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    const header = (
      <div className="Content">
        {this.element("Booking id:", this.handlerB)}
        {this.element("User id:", this.handlerUId)}
        {this.element("User name:", this.hanlderUName)}
        {this.element("Item id:", this.hanlderIID)}
        {this.element("Item type:")}
        {this.element("Item info:")}
        {this.element("Active:")}
        {this.element("Start date:", this.handlerSD)}
      </div>
    )

    if (this.state.bookings) {
      const listBookings = (
        this.state.bookings.length === 0 ? <div>No bookings</div> :
          <div>
            {this.state.bookings.map(item => (
              <Booking booking={item} className="Booking" key={item.booking_id} />
            ))}
          </div>
      )

      return (
        <div className="Wrapper">
          <div className="Helper">
            <div className="SearchWrapper">
              <button className="SearchButton" onClick={this.handler}>XD</button>
              <input type="date"></input>
            </div>
          </div>

          {header}
          {listBookings}
        </div>
      )
    } else {
      return <div>Error</div>
    }

  }
}

export default withRouter(Bookings)