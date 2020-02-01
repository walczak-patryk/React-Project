import React from "react";
import { withRouter } from "react-router-dom";
import '../css/LoginPage.css'

class PageLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            error: false
        };

        this.loginHandler = this.loginHandler.bind(this);
    }



    loginHandler(e) {
        // if (e.target.uname.value === "asd" && e.target.psw.value === "asd") {
        //     document.cookie = `token=asd`
        //     this.props.history.push("/bookings");
        //     return;
        // }

        e.preventDefault();
        this.setState({ error: false })
        fetch('http://minibookly.us-east-1.elasticbeanstalk.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ "username": e.target.uname.value, "password": e.target.psw.value })

        })
            .then(res => {
                console.log(res.status);
                // if (res.status === 200) {
                //     this.setState({ token: res.body });
                //     res.text().then(text => {
                //         document.cookie = `token=${text}` // expire date - on closing browser, path = current path
                //     });sssssssssssss
                //     this.props.history.push("/bookings")
                // }
                // else {
                //     this.setState({ error: true });
                //     console.log(res.status)
                // }
            })

    }

    render() {
        const loginForm = (
            <div>
                <div className="LoginForm" align="center">
                    <form onSubmit={e => this.loginHandler(e)}>
                        <div className="container">
                            <div className="label-input">
                                <label className="LoginLabel" htmlFor="uname">Username:</label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    name="uname"
                                    required
                                />
                            </div>
                            <div className="label-input">
                                <label className="LoginLabel" htmlFor="psw">Password:</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="psw"
                                    required
                                />
                            </div>
                            <button className="LoginButton" type="submit">
                                Sign in
                            </button>
                            {this.state.error === true && <p className="error">Invalid username or password</p>}
                        </div>
                    </form>
                </div>
            </div>
        )

        const loggedInInfo = (
            <div>
                You're already logged in !
            </div>
        )
        return (
            document.cookie ? loggedInInfo : loginForm
        )
    }
}


export default withRouter(PageLogin);