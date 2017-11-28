import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Button, Divider, Container } from 'semantic-ui-react'
// import { fetchSingleGame } from '../actions'
import { db } from '../firebase'

class Wait extends Component {

  // componentDidMount() {
  //   this.cancel = this.props.fetchSingleGame(this.props.gameId)
  // }

  // componentWillUnmount(){
  //   this.cancel()
  // }

  render() {
    const { currentGame, handleStart, gameId, handleLeave, history } = this.props
    return (
      <Container style={{ marginTop: '10vh', padding:'10%', backgroundColor: 'rgba(255,255,255,0.5)',  width: '50%' }}>
        {currentGame &&
          currentGame.game && (
            <div>
              <Header as="h1"> Game {gameId.slice(0,2)} Lobby </Header>
              <Header as="h1">
                {' '}
                Players ({currentGame.game.playerCount}/4){' '}
              </Header>

              {[1, 2, 3, 4].map(num => (
                <div key={num}>
                  <strong>
                  {currentGame.players[`player${num}`].name.length
                    ? currentGame.players[`player${num}`].name +
                      ` has joined as ${
                        currentGame.players[`player${num}`].color
                      } player`
                    : `waiting for player${num} ......`}
                    </strong>
                </div>
              ))}

              <Divider section/>

              <div>
                <Button onClick={e => handleLeave(e, gameId, currentGame.game.playerCount, history)}> Leave Game </Button>
                <Button
                  color='blue'
                  onClick={e => handleStart(e, gameId)}
                  disabled={currentGame.game.playerCount < 4} > Start </Button>
              </div>
            </div>
          )}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  gameId: ownProps.gameId,
  currentGame: ownProps.currentGame,
  history: ownProps.history
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // fetchSingleGame: gameId => dispatch(fetchSingleGame(gameId)),
    handleStart: (e, gameId) => {
      let gameStatusUpdate = {}
      gameStatusUpdate[`game.active`] = true
      db
        .collection('games')
        .doc(`${gameId}`)
        .update(gameStatusUpdate)
      // ownProps.history.push(`/game/${gameId}`)
    },
    handleLeave: (e, gameId, playerCount, history) => {
      history.push(`/lobby`)
      let playerUpdate = {}
      playerUpdate[`players.${localStorage.getItem(gameId)}.name`] = '0'
      playerUpdate['game.playerCount'] = playerCount - 1
      db
        .collection('games')
        .doc(`${gameId}`)
        .update(playerUpdate)
      localStorage.removeItem(gameId)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait)
