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
    /* How to test
      Uncomment first line to reseed database
      After database is seeded, uncomment this.props.fetchSingleGame
    */
      // db.collection('testGames').doc('bryan-test').set(dummyData) // Seed Firebase with dummyData
    this.props.fetchSingleGame('bryan-test');
  }

  render() {
      console.log('currentGame', this.props)

      const testOffer = {brick: 1, ore: 0, sheep: 0, wheat: 0, wood: 0}
      const testExchange = {brick: 0, ore: 1, sheep: 0, wheat: 0, wood: 0}
    if (this.props.currentGame.game) {
        return (
            <div>
              <Button onClick={this.props.rollDice}>Roll dice</Button>
              <Button onClick={() => this.props.endTurn(this.props.currentGame.game.currentPlayer)}>Next player</Button>
              <Button onClick={() => this.props.distributeCards(10)}>Distribute Cards</Button>
              <Button onClick={() => this.props.enableBuildAndTrade(2)}>enableBuildAndTrade</Button>
              <Button onClick={() => this.props.enableBuild(1)}>enableBuild</Button>
              <Button onClick={() => this.props.buildRoad(1)}>buildRoad</Button>
              <Button onClick={() => this.props.buildSettlement(1)}>buildSettlement</Button>
              <Button onClick={() => this.props.buildCity(1)}>buildCity</Button>
              <Button onClick={() => this.props.initiateTrade(1, 2, testOffer, testExchange)}>initiateTrade</Button>
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
