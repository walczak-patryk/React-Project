import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../css/NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  componentDidMount() {
    //console.log("current location: ", this.props.location.pathname)
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  logoutHandler() {
    if (this.getCookieValue("token") === undefined) {
      //console.log("XD")
      return;
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    this.props.history.push("/");
    //console.log(document.cookie)
  }

  render() {
    const cond = this.getCookieValue("token") === undefined
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <a className="navbar-brand noSelect">Bookly - reservation history</a>
          <li className="nav-item">
            <a className="nav-link noSelect Clickable" onClick={this.logoutHandler} style={{ display: !cond ? "block" : "none" }}>Logout</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(NavBar)
