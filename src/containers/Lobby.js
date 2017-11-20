import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
import {connect} from 'react-redux'
// import firebase from 'APP/fire'
// import 'firebase/firestore'

// const db = firebase.firestore()

class Lobby extends Component {


  render() {
      console.log(this.props.allGames)

    return (
    <div>
      <div>Hello</div>
      <IndividualRoom allGames={this.props.allGames} />
    </div>
    )
  }
}

const mapState = (state) => ({
  allGames: state.allGames
})

export default connect(mapState)(Lobby)