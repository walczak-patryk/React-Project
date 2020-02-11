import React from 'react';
import { withRouter } from "react-router-dom";
import Details from './Details'
import '../css/Booking.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    props.booking.start_date = new Date(props.booking.start_date);
    this.state = {
      showDetails: false,
      detailsLoaded: false,
      detailsLoading: false,
      details: null,
      error: false
    }
    this.buttonHandler = this.buttonHandler.bind(this)
    this.loadDetails = this.loadDetails.bind(this)
  }

  buttonHandler = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }))
    this.loadDetails();
  }
  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }
  loadDetails() {
    if (this.state.detailsLoaded) {
      return;
    }
    this.setState({
      detailsLoading: true
    });
    //console.log(this.props.booking.type)
    fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings/${this.props.booking.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getCookieValue('token')}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          alert('You have been logged out of your session, please login in again!');
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
          this.props.history.push("/");
        } else {
          this.setState({ error: true })
        }
      })
      .then(data => {
        if (!this.state.error) {
          this.setState({ details: data })
        }
      })
      .then(() => this.setState({ detailsLoading: false, detailsLoaded: true }));
  }

  render() {
    const { booking } = this.props

    // const myButton = (
    //   <button onClick={this.buttonHandler}>XD</button>
    // )

    const error = (
      <div style={{ margin: "1%" }}>
        There has been an error while loading the details.
        <button onClick={this.loadDetails} className="btn-primary">X Retry D</button>
      </div>
    )

    const preDetails = (
      this.state.detailsLoading
        ? <div style={{ margin: "1%" }}><div className="spinner-border text-dark"></div></div>
        : !this.state.error ? <Details data={this.state.details} itemType={booking.type} /> : error
    )

    return (
      <div className="card cardxd bg-light text-dark">
        <div className="card-header cardClickable" onClick={this.buttonHandler}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3 text-left">
                  {booking.id}
                </div>
                <div className="col-md-3 text-left">
                  {booking.owner}
                </div>
                <div className="col-md-3 text-left">
                  {booking.username}
                </div>
                <div className="col-md-3 text-left">
                  {booking.itemId}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3 text-left">
                  {booking.itemType}
                </div>
                <div className="col-md-3 text-left">
                  {booking.details}
                </div>
                <div className="col-md-3 text-left">
                  {booking.active.toString()}
                </div>
                <div className="col-md-3 text-left">
                  {booking.startDateTime}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showDetails && preDetails}
      </div>
    )
  }
}

export default withRouter(Booking)

// {this.element(booking.booking_id)}
// {this.element(booking.user_id)}
// {this.element(booking.username)}
// {this.element(booking.item_id)}
// {this.element(booking.type)}
// {this.element(booking.item_info)}
// {this.element(booking.active.toString())}
// {this.element(`${booking.start_date.getDate()} 
//   ${booking.start_date.getMonth() + 1} ${booking.start_date.getFullYear()}`)}