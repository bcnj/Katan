import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
import {connect} from 'react-redux'
import { db } from '../firebase'
import { Container } from 'semantic-ui-react'
import { fetchGames } from '../actions'

class Lobby extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.fetchGames()
    // db.collection('games')
    // .get().then(doc => console.log(doc.exists))
  }

  render() {
    const { allGames, handleJoin, user, playerNum } = this.props


    return (
    <Container style={{marginTop: '10vh'}}>
      <IndividualRoom allGames={allGames} handleJoin={handleJoin} user={user} playerNum={playerNum}/>
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allGames: state.games,
    user: state.user,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGames: () => dispatch(fetchGames()),
    // handleJoin: (gameId) => {
    //   db.collection('games').doc(`${gameId}`).collection('players').doc('player1')
    //     .update({player1: { name: 'claire' }})
    //   ownProps.history.push(`/room/wait/${gameId}`)
    // }
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)

