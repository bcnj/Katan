import React, {Component} from 'react'
// import firebase from 'APP/fire'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { Header, Button, Dropdown, Menu } from 'semantic-ui-react'
import { fetchSingleGame } from '../actions'

const colorOption = [{text: 'red', value: 'red'}, {text: 'white', value: 'white'}, {text: 'blue', value: 'blue'}, {text: 'yellow', value: 'yellow'}]

class Wait extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchSingleGame(this.props.gameId)
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <Header as='h1'> Lobby </Header>
        <Header as='h1'> Players ({}/4) </Header>

        {/* { this.props.currentGame. } */}

        {/* <div>
          { this.props.players.player1 ?
          <div> {this.props.players.player1.name} </div> :
          <div> Player 1 </div>
          }
          <Dropdown placeholder='Color' search selection options={colorOption}></Dropdown>
        </div> */}

        <div>
          <Button> Leave Game </Button>
          <Button> Start </Button>
        </div>
      </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait)