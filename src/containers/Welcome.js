import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { createGame } from '../actions'
// import dummyData from './dummyData'
import { db } from '../firebase'
import dummyData from '../dummyData'
// import * as actions from '../actions'

class Welcome extends Component {

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '40vh' }}>
        <h1> Settlers of Catan </h1>
        <div>
          <div style={{ textAlign: 'around' }}>
            <Link to={'/lobby'}>
              <Button secondary> Join Game </Button>
            </Link>
            { this.props.user && this.props.user.name &&
            <Button secondary onClick={() => this.props.handleCreate(this.props.user.name)}>
              Create Game
            </Button>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allGames: state.game,
    tiles: state.tiles,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCreate: (username) => {
      db.collection('games').add(dummyData)
      .then(game =>{
        let playerUpdate = {}
        playerUpdate[`players.player1.name`] = username
        playerUpdate['game.playerCount'] = 1
        db
          .collection('games')
          .doc(`${game.id}`)
          .update(playerUpdate)
          .catch(err=>console.log('create game: error in adding a player to be able to join a game: ',err))
        localStorage.setItem(`${game.id}`, 'player1')
        ownProps.history.push(`/game/${game.id}`)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
