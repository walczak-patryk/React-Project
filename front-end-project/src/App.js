import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Bookings from './BookingsPage'
import Details from './Details'
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage'
import NavBar from './NavBar'

function App() {
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/bookings" component={Bookings} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
