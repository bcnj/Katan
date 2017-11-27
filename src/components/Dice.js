import React from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import { connect } from 'react-redux'
import { rollDice, distributeResources} from '../utils'
import { db } from '../firebase'

class DiceRoll extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rollAll: false,
    }
    this.rollAll = this.rollAll.bind(this)
    this.rollDoneCallback = this.rollDoneCallback.bind(this)
  }

  render() {
    const { currentGame, gameId } = this.props
    const { diceDisplay } = this.state

    return (
      <div>
        { currentGame && currentGame.game && currentGame.intersectionNodes &&
          (currentGame.game.currentPlayer === localStorage.getItem(gameId) ?
        <div>
        <ReactDice
          numDice={2}
          rollDone={(num) => this.rollDoneCallback(num, gameId, currentGame.tileNodes, currentGame.intersectionNodes)}
          ref={dice => this.reactDice = dice}
          faceColor={'#FFA500'}
          dotColor={'#002D7F'}
          disableIndividual={true}
        />
        <button onClick={(e) => this.rollAll(gameId, currentGame.game.diceRollCount)}
          disabled={ currentGame.game.turn < 8 ||
          currentGame.game.diceRollCount > currentGame.game.turn || localStorage.getItem(`${gameId}`) !== currentGame.game.currentPlayer
          }> RollDice </button>
        </div>
        :
        <h3>
          <br/>
          Current Dice Roll: <strong>{currentGame.game.diceRoll}</strong>
        </h3>)}
      </div>
    )
  }

  rollAll(gameId, currentCount) {
    this.reactDice.rollAll()
    this.setState({rollAll: true})
    let diceRollCountUpdate = {}
    diceRollCountUpdate[`game.diceRollCount`] = currentCount + 1
    db.collection('games').doc(`${gameId}`)
      .update(diceRollCountUpdate)
  }

  rollDoneCallback(num, gameId, tileNodes, intersectionNodes) {
    if(this.state.rollAll){
      rollDice(num, gameId)
      distributeResources(num, gameId, tileNodes, intersectionNodes)
      this.setState({rollAll: false})
    }
  }
}

export default connect()(DiceRoll)