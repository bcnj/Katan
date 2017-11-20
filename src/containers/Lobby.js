import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
// import firebase from 'APP/fire'
// import 'firebase/firestore'

// const db = firebase.firestore()

export default class Lobby extends Component {
  constructor() {
    super()
    this.state={
      allGames: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
    <div>
      <div>Hello</div>
      <IndividualRoom allGames={this.state.allGames} />
    </div>
    )
  }
}
