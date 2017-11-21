import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { db } from '../firebase'
import dummyData from '../dummyData'

// Determine what game user is in
// Adjust values inside specific document (game instance)

class Test extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //   db.collection('testGames').doc('bryan-test').set(dummyData) // Seed Firebase with dummyData
    this.props.fetchSingleGame('bryan-test');
  }

  render() {
      console.log('currentGame', this.props)
    if (this.props.currentGame.game) {
        return (
            <div>
              <Button onClick={this.props.rollDice}>Roll dice</Button>
              <Button onClick={() => this.props.endTurn(this.props.currentGame.game.currentPlayer)}>Next player</Button>
              <h1>Latest dice roll: {this.props.currentGame.game.diceRoll}</h1>
            </div>
          )
    }
    else return <div></div>
  }
}

const mapStateToProps = (state) => ({
    currentGame: state.currentGame
  })

export default connect(mapStateToProps, actions)(Test)

// How to determine what document is being adjusted in game
// How to fetch current gamegit
// Actions

// Dice rolling
