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

function App() {
  return (
    <div className="App">
      <div className="Title">
        <h2>Bookly - Reservation History</h2>
      </div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/bookings" component={Bookings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
