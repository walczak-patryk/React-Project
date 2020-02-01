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

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  logoutHandler() {
    if (this.getCookieValue("token") === undefined) {
      console.log("XD")
      return;
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    this.props.history.push("/");
    console.log(document.cookie)
  }

  render() {
    const clickable = "asd"
    const unclickable = "asdd"
    const cond = this.getCookieValue("token") === undefined
    return (
      <div style={{ minWidth: "430px" }}>
        <ul>
          <div>Bookly - reservation history</div>
          <li className="clickable"><p onClick={this.logoutHandler} style={{ display: !cond ? "block" : "none" }}>Logout</p></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavBar)
