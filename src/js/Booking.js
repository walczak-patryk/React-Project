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
      details: null
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

  loadDetails() {
    if (this.state.detailsLoaded) {
      return;
    }
    this.setState({
      detailsLoading: true
    });
    //console.log(this.props.booking.type)
    fetch(`http://localhost:3004/${this.props.booking.type}/${this.props.booking.item_id}`)
      .then(response => response.json())
      .then(data => this.setState({ details: data }))
      .then(() => this.setState({ detailsLoading: false, detailsLoaded: true }));
  }

  render() {
    const { booking } = this.props

    // const myButton = (
    //   <button onClick={this.buttonHandler}>XD</button>
    // )

    const preDetails = (
      this.state.detailsLoading
        ? <div style={{ marginTop: "0.5%" }}>Loading details...</div>
        : <Details data={this.state.details} itemType={booking.type} />
    )

    return (
      <div className="card cardxd bg-light text-dark">
        <div className="card-header cardClickable" onClick={this.buttonHandler}>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3 text-left">
                  {booking.booking_id}
                </div>
                <div className="col-md-3 text-left">
                  {booking.user_id}
                </div>
                <div className="col-md-3 text-left">
                  {booking.username}
                </div>
                <div className="col-md-3 text-left">
                  {booking.item_id}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3 text-left">
                  {booking.type}
                </div>
                <div className="col-md-3 text-left">
                  {booking.item_info}
                </div>
                <div className="col-md-3 text-left">
                  {booking.active.toString()}
                </div>
                <div className="col-md-3 text-left">
                  {`${booking.start_date.getDate()} 
                    ${booking.start_date.getMonth() + 1} ${booking.start_date.getFullYear()}`}
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