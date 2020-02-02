import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react"
import '../css/BookingsPage.css'

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null,
      bookingIdAsc: false,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
      isLoading: false
    }
    this.loadBookings = this.loadBookings.bind(this);
    this.Element = this.Element.bind(this);
    this.handlerBID = this.handlerBID.bind(this);
    this.handlerSD = this.handlerSD.bind(this);
    this.handlerUId = this.handlerUId.bind(this);
    this.hanlderIID = this.hanlderIID.bind(this);
    this.hanlderUName = this.hanlderUName.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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

  mySort = (a, b, cond) => {
    if (!cond)
      return a < b ? 1 : -1;
    else {
      return a > b ? 1 : -1;
    }
  }

  handlerBID = () => {
    if (this.state.bookingIdAsc === null) {
      this.state.bookingIdAsc = false; // i know this is stupid but it works (same for all sorting handlers)
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.booking_id, b.booking_id, this.state.bookingIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      bookingIdAsc: !prevstate.bookingIdAsc,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }),
      console.log("booking id: ", this.state.bookingIdAsc))
  }

  handlerUId = () => {
    if (this.state.userIdAsc === null) {
      this.state.userIdAsc = false; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.user_id, b.user_id, this.state.userIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userIdAsc: !prevstate.userIdAsc,
      bookingIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }),
      console.log("User id: ", this.state.userIdAsc))
  }

  hanlderUName = () => {
    if (this.state.userNameAsc === null) {
      this.state.userNameAsc = false; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.username, b.username, this.state.userNameAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userNameAsc: !prevstate.userNameAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }),
      console.log("user name: ", this.state.userNameAsc))
  }

  hanlderIID = () => {
    if (this.state.itemIdAsc === null) {
      this.state.itemIdAsc = false; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.item_id, b.item_id, this.state.itemIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      itemIdAsc: !prevstate.itemIdAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      startDateAsc: null,
    }),
      console.log("item id:", this.state.itemIdAsc))
  }

  handlerSD = () => {
    if (this.state.startDateAsc === null) {
      this.state.startDateAsc = false; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.start_date, b.start_date, this.state.startDateAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      startDateAsc: !prevstate.startDateAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
    }),
      console.log("start date", this.state.startDateAsc))
  }

  Element = (value, hanlder, cond, sortable) => {
    if (value === "Item info:") {
      return (
        <div className="ElementHeader">
          <text style={{ marginLeft: "1%" }}>{value}</text>
          <Icon name='info circle' onClick={() => alert("Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber")} />
        </div>
      )
    }
    else if (sortable) {
      return (
        <div className="ElementHeader Clickable" onClick={hanlder}>
          <text style={{ marginLeft: "1%" }}>{value}</text>
          {cond === null ? <div></div>
            : cond ? <Icon name='caret down' style={{ float: "right" }} />
              : <Icon name='caret up' style={{ float: "right" }} />}
        </div>
      )
    }
    else {
      return (
        <div className="ElementHeader">
          <text style={{ marginLeft: "1%" }}>{value}</text>
        </div>
      )
    }
  }

  ElementXD = (value, hanlder, cond, sortable) => {
    if (value === "Item info:") {
      return (
        <div className="col-md-3 text-left">
          <text>{value}</text>
          <Icon name='info circle' className="infoIcon" onClick={() => alert("Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber")} />
        </div>
      )
    }
    else if (sortable) {
      return (
        <div className="col-md-3 text-left Clickable" onClick={hanlder}>
          <text>{value}</text>
          {cond === null ? <div></div>
            : cond ? <Icon name='caret down' style={{ float: "right" }} />
              : <Icon name='caret up' style={{ float: "right" }} />}
        </div>
      )
    }
    else {
      return (
        <div className="col-md-3 text-left">
          <text>{value}</text>
        </div>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    const headerXD = (
      <div className="Content">
        {this.Element("Booking id:", this.handlerBID, this.state.bookingIdAsc, 1)}
        {this.Element("User id:", this.handlerUId, this.state.userIdAsc, 1)}
        {this.Element("Username:", this.hanlderUName, this.state.userNameAsc, 1)}
        {this.Element("Item id:", this.hanlderIID, this.state.itemIdAsc, 1)}
        {this.Element("Item type:", null, null, 0)}
        {this.Element("Item info:")}
        {this.Element("Active:", null, null, 0)}
        {this.Element("Start date:", this.handlerSD, this.state.startDateAsc, 1)}
      </div>
    )

    const header = (
      <div className="card bg-primary text-white cardBP">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
              {this.ElementXD("Booking id:", this.handlerBID, this.state.bookingIdAsc, 1)}

              {this.ElementXD("User id:", this.handlerUId, this.state.userIdAsc, 1)}

              {this.ElementXD("Username:", this.hanlderUName, this.state.userNameAsc, 1)}

              {this.ElementXD("Item id:", this.hanlderIID, this.state.itemIdAsc, 1)}

              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
              {this.ElementXD("Item type:", null, null, 0)}
              {this.ElementXD("Item info:")}
              {this.ElementXD("Active:", null, null, 0)}
              {this.ElementXD("Start date:", this.handlerSD, this.state.startDateAsc, 1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    if (this.state.bookings) {
      const listBookings = (
        this.state.bookings.length === 0 ? <div>No bookings</div> :
          <div>
            {this.state.bookings.map(item => (
              <Booking booking={item} key={item.booking_id} />
            ))}
          </div>
      )

      return (
        <div className="Wrapper">
          {/* <div className="Helper">
            <div className="SearchWrapper">
              <button className="SearchButton" onClick={this.handler}>XD</button>
              <input type="date"></input>
            </div>
          </div> */}
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