import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Bookings from './BookingsPage'
import '../css/App.css';
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/bookings" component={Bookings} />
          </Switch>
        </Router>
      </div>
      <div className="App-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
