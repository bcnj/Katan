import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { db } from '../firebase'
import { endTurn, distributeResourcesInit } from '../utils'

const EndTurnBtn = ({ handleEnd, currentGame, gameId }) => {
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        endTurn(currentGame.game.turn, currentGame.game.currentPlayer, gameId)
      }}
      style={{ width: '49%', height: '75%' }}
    >
      End Turn
    </Button>
  )
}

const mapState = (state, ownProps) => {
  return {
    currentGame: state.currentGame,
    gameId: ownProps.gameId
  }
}

// const mapDispatch = (dispatch) => {
//     return {
//     handleEnd: (e, currentTurn, currentPlayer, gameId) => {
//       e.preventDefault()
//       let endTurn = {}
//       let playerNum = +currentPlayer[6]
//       endTurn[`game.turn`] = currentTurn+1
//       endTurn[`game.diceRollCount`] = currentTurn+1
//       if(currentTurn > 7 || currentTurn < 3){
//         endTurn[`game.currentPlayer`] = ((playerNum < 4) ? `player${playerNum+1}` : `player${playerNum-3}`)
//       } else if (currentTurn === 3 ){
//         endTurn[`game.currentPlayer`] = 'player4'
//       } else if (currentTurn === 4 ){
//         endTurn[`game.currentPlayer`] = 'player4'
//       } else if (currentTurn === 5 ){
//         endTurn[`game.currentPlayer`] = 'player3'
//       } else if (currentTurn === 6 ){
//         endTurn[`game.currentPlayer`] = 'player2'
//       } else if (currentTurn === 7 ){
//         endTurn[`game.currentPlayer`] = 'player1'
//       }
//       db.collection('games').doc(`${gameId}`)
//       .update(endTurn)
//     },
//   };
// };

export default connect(mapState)(EndTurnBtn)
