import React, { Component } from 'react'
// import firebase from 'APP/fire'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { Header, Button, Dropdown, Menu } from 'semantic-ui-react'
import { fetchSingleGame } from '../actions'
import { Container } from 'semantic-ui-react'

class Wait extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSingleGame(this.props.gameId)
  }

  render() {
    const { currentGame, handleStart, gameId } = this.props
    return (
      <Container style={{ marginTop: '10vh' }}>
        {currentGame &&
          currentGame.game && (
            <div>
              <Header as="h1"> Lobby </Header>
              <Header as="h1">
                {' '}
                Players ({currentGame.game.playerCount}/4){' '}
              </Header>

              {[1, 2, 3, 4].map(num => (
                <div key={num}>
                  {currentGame.players[`player${num}`].name.length
                    ? currentGame.players[`player${num}`].name +
                      ` has joined as ${
                        currentGame.players[`player${num}`].color
                      } player`
                    : `waiting for player${num}`}
                </div>
              ))}

              <div>
                <Button> Leave Game </Button>
                <Button onClick={e => handleStart(e, gameId)}> Start </Button>
                {/* disabled={currentGame.game.playerCount < 4} */}
              </div>
            </div>
          )}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  gameId: ownProps.match.params.gameId,
  currentGame: state.currentGame
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleGame: gameId => dispatch(fetchSingleGame(gameId)),
    handleStart: (e, gameId) => {
      ownProps.history.push(`/game/${gameId}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait)
