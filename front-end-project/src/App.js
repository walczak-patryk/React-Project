import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Test from './test'
import Details from './Details'
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage}/> 
          <Route exact path="/bookings" component={Test}/>
          <Route exact path="/bookings/:id" component={Details}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
