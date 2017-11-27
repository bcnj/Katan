import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
import { connect } from 'react-redux'
import { db } from '../firebase'
import { Container } from 'semantic-ui-react'
import { fetchGames, setPlayer } from '../actions'

class Lobby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { allGames, handleJoin, user, handleWatch } = this.props

    return (
      <Container style={{ marginTop: '10vh' }}>
        <IndividualRoom
          allGames={allGames}
          handleWatch={handleWatch}
          handleJoin={handleJoin}
          user={user}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    allGames: state.games,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGames: () => dispatch(fetchGames()),
    handleJoin: (gameId, playerCount, username) => {
      let playerUpdate = {}
      playerUpdate[`players.player${playerCount + 1}.name`] = username
      playerUpdate['game.playerCount'] = playerCount + 1
      db
        .collection('games')
        .doc(`${gameId}`)
        .update(playerUpdate)
      // dispatch(setPlayer({gameId: gameId, playerNum: `${playerCount+1}`}))
      localStorage.setItem(`${gameId}`, `player${playerCount + 1}`)
      ownProps.history.push(`/game/wait/${gameId}`)
    },
    handleWatch: gameId => {
      ownProps.history.push(`/game/${gameId}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
