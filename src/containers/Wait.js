import React, {Component} from 'react'
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

  componentWillMount() {
    this.props.fetchSingleGame(this.props.gameId)
  }

  render() {
    console.log(this.props)
    const { currentGame, handleStart } = this.props

    return (
      <Container style={{marginTop: '10vh'}}>
      { currentGame && currentGame.game &&
        <div>

          <Header as='h1'> Lobby </Header>
          <Header as='h1'> Players ({currentGame.game.playerCount}/4) </Header>

            <div> { currentGame.players.player1.name.length ?  currentGame.players.player1.name + ` has joined as ${currentGame.players.player1.color} player` : 'waiting for player1'} </div>
            <div> { currentGame.players.player2.name.length ?  currentGame.players.player2.name + ` has joined as ${currentGame.players.player2.color} player` : 'waiting for player2'} </div>
            <div> { currentGame.players.player3.name.length ?  currentGame.players.player3.name + ` has joined as ${currentGame.players.player3.color} player` : 'waiting for player3'} </div>
            <div> { currentGame.players.player4.name.length ?  currentGame.players.player4.name + ` has joined as ${currentGame.players.player4.color} player` : 'waiting for player3'} </div>

          <div>
            <Button> Leave Game </Button>
            <Button disabled={currentGame.game.playerCount < 4} onClick={(e) => handleStart(e, currentGame.game.playerCount)}> Start </Button>
          </div>
        </div> }
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  gameId: ownProps.match.params.roomId,
  currentGame: state.currentGame
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleGame: (gameId) => dispatch(fetchSingleGame(gameId)),
    handleStart: (e, playerCount) => {
      ownProps.history.push('/game')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait)
