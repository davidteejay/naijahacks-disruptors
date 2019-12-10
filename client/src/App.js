import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import HostAHome from './components/dashboard/HostAHome';
import RentAHome from './components/dashboard/RentAHome';
import ContactUs from './components/dashboard/ContactUs';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

 class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Navbar}/>
          <Route exact path='/host' component={HostAHome}/>
          <Route exact path='/rent' component={RentAHome}/>
          <Route exact path='/contact' component={ContactUs}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/signup' component={SignUp}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

