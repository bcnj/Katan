import {
  BUILD_CITY,
  BUILD_SETTLEMENT,
  FETCH_ALL_GAMES,
  CREATE_GAME,
  END_GAME,
  SET_PLAYER,
  SET_USER,
  FETCH_ONE_GAME,
  ROLL_DICE,
  END_TURN
} from './types'
import { db } from '../firebase'
import dummyData from '../dummyData'

// const gamesRef = db.collection('games')
const gamesRef = db.collection('testGames')

// build
export const buildSettlement = () => ({
  type: BUILD_SETTLEMENT,
  p1_settlement: true
})
export const buildCity = () => ({ type: BUILD_CITY, p1_city: true })

// game
export const fetchGames = () => dispatch =>
  db.collection('testGames').onSnapshot(snap => {
    console.log('snap', snap)
    dispatch({
      type: FETCH_ALL_GAMES,
      payload: snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  })

export const fetchSingleGame = id => dispatch =>
  db
    .collection('testGames')
    .doc(`${id}`)
    .onSnapshot(snap => {
      dispatch({
        type: FETCH_ONE_GAME,
        payload: snap.data()
      })
    })

export const setUser = payload => ({
  type: SET_USER,
  payload
})

export const setPlayer = payload => ({})

/* REFACTOR */

const testCollection = 'testGames'
const testDoc = 'bryan-test'
/* Executes on next turn */
export const rollDice = () => {
  console.log('Rolling dice...')
  let dice1 = Math.floor(Math.random() * 6) + 1
  let dice2 = Math.floor(Math.random() * 6) + 1
  const diceSum = dice1 + dice2
  return function(dispatch) {
    let diceRoll = {}
    diceRoll[`game.diceRoll`] = diceSum
    db
      .collection(testCollection)
      .doc(testDoc)
      .update(diceRoll)
      .then(() => console.log('Dice has been rolled'))
      .catch(err => console.log('Error has occured for rolling dice: ', err))
  }
}

/* Player ends turn, switches to next player
  Notes: Change dummyData.game.currentPlayer equal to a number 1 to indicate player1
  endTurn accepts a player as a number and manipulates Firebase store. No 
*/

export const endTurn = player => {
  console.log('end turn ')
  console.log(`game.currentPlayer`)
  
  return function() {
    let currentPlayer = {}
    if (player >= 4) {
      currentPlayer[`game.currentPlayer`] = 1
      console.log('IF')
    }
    else {
      currentPlayer[`game.currentPlayer`] = player + 1
    }   
    db
    .collection(testCollection)
    .doc(testDoc)
    .update(currentPlayer)
  }
}
