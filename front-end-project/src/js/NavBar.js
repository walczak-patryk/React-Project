import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../css/NavBar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  componentDidMount() {
    console.log("current location: ", this.props.location.pathname)
  }

  logoutHandler() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    this.props.history.push("/");
    console.log(document.cookie)
  }

  render() {
    return (
      <div>
        <ul>
          <li><a onClick={() => this.props.history.push("/bookings")}>Bookings</a></li>
          <li><a onClick={() => this.props.history.push("/")}>Login</a></li>
          <li style={{ float: "right" }}><a onClick={this.logoutHandler}>Logout</a></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavBar)