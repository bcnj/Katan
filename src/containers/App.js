import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Welcome from './Welcome'
import Lobby from './Lobby'
import Room from './Room'
import Wait from './Wait'
import GamePage from './GamePage'

import Background from '../images/catan1.jpg'
import Test from './Test';

import firebase from '../firebase'
import WhoAmI from './WhoAmI'
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export default () => (

  <Router>
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(' + Background + ')',
      backgroundSize: 'cover',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '0'}}>
      <nav>
        <WhoAmI auth={auth} />
      </nav>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/game' component={GamePage} />
        <Route path='/lobby' component={Lobby} />
        <Route path='/room/wait/:roomId' component={Wait} />
        <Route path='/test' component={Test} />
      </Switch>
    </div>
  </Router>
)
