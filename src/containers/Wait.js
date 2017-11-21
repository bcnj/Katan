import React, {Component} from 'react'
// import firebase from 'APP/fire'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { Header, Button, Dropdown, Menu } from 'semantic-ui-react'


const colorOption = [{text: 'red', value: 'red'}, {text: 'white', value: 'white'}, {text: 'blue', value: 'blue'}, {text: 'yellow', value: 'yellow'}]

class Wait extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      user: {},
      currentPlayer: '',
      start: false
    }
  }

  // componentDidMount() {
  //   db.doc(`games/${this.props.match.params.roomId}`)
  //     .onSnapshot(snap => {
  //       console.log('!!!!', snap.data())
  //       this.setState({players: snap.data().players})
  //     })
  // }

  render() {

    return (
      <div>
        <Header as='h1'> Lobby </Header>
        <Header as='h1'> Players ({}/4) </Header>

        <div>
          { this.state.players.player1 ?
          <div> {this.state.players.player1.name} </div> :
          <div> Player 1 </div>
          }
          <Dropdown placeholder='Color' search selection options={colorOption}></Dropdown>
        </div>

        <div>
          <Button> Leave Game </Button>
          <Button> Start </Button>
        </div>
      </div>
    )
  }
}

// const mapState = (state, ownProps) => ({
//   allGames: state.firestore.games
// })

export default connect()(Wait)