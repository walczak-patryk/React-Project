import React from 'react';
import { withRouter } from "react-router-dom";
import Details from './Details'
import './Booking.css';

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

  element = (value) => {
    return (
      <div className="Element">{value}</div>
    )
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
    fetch(`http://localhost:8080/${this.props.booking.type}/${this.props.booking.item_id}`)
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
      this.state.detailsLoading ? <div style={{ marginTop: "0.5%" }}>Loading details...</div> : <Details data={this.state.details} itemType={booking.type} />
    )

    return (
      <div>
        <div className="Booking" onClick={this.buttonHandler}>
          {this.element(booking.booking_id)}
          {this.element(booking.user_id)}
          {this.element(booking.username)}
          {this.element(booking.item_id)}
          {this.element(booking.type)}
          {this.element(booking.item_info)}
          {this.element(booking.active.toString())}
          {this.element(`${booking.start_date.getDate()} 
                    ${booking.start_date.getMonth() + 1} ${booking.start_date.getFullYear()}`)}
          {/* {this.element(myButton)} */}
        </div>
        {this.state.showDetails && preDetails}
      </div>
    )
  }
}

export default withRouter(Booking)

// booking.start_date.getDate() + ' ' 
// + booking.start_date.getMonth() + ' ' 
// + booking.start_date.getFullYear()