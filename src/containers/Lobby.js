import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
import { connect } from 'react-redux'
import { db } from '../firebase'
import { Container } from 'semantic-ui-react'
import { fetchGames } from '../actions'

class Lobby extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchGames()
  }

  render() {
    const { allGames, handleJoin, user } = this.props
    console.log('this.props', this.props)
    return (
      <Container style={{ marginTop: '10vh' }}>
        <IndividualRoom
          allGames={allGames}
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
    handleJoin: (gameId, playerCount) => {
      console.log('gameId', gameId)
      let playerUpdate = {}
      playerUpdate[`players.player${playerCount + 1}.name`] = 'guest'
      playerUpdate['game.playerCount'] = playerCount + 1
      db
        .collection('games')
        .doc(`${gameId}`)
        .update(playerUpdate)
      ownProps.history.push(`/room/wait/${gameId}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
