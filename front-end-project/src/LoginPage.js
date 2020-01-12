import React from "react";
import { withRouter } from "react-router-dom";
import './LoginPage.css'

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: "",
            password: ""
        };
    
        this.loginHandler = this.loginHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      }
    
    
      usernameChangeHandler(e) {
        this.setState({ username: e.target.value });
      }

      passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
      }
    
      loginHandler(e) {
        e.preventDefault();
        this.props.history.push("/bookings");
      }


    render() {
        return (
            <div>
                <div className="Title">
                    <h2>Bookly - Reservation History</h2>
                </div>
                <div className="LoginForm" align="center">
                    <form onSubmit={e => this.loginHandler(e)}>
                        <div className="container">
                            <div className="label-input">
                                <label className="LoginLabel" for="uname">Username:</label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    name="uname"
                                    onChange={this.usernameChangeHandler}
                                    required
                                />
                            </div>
                            <div className="label-input">
                                <label className="LoginLabel" for="psw">Password:</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="psw"
                                    onChange={this.passwordChangeHandler}
                                    required
                                />
                            </div>
                            <button className="LoginButton" type="submit">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

  
  export default withRouter(PageLogin);