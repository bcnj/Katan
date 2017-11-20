import firebase from 'firebase'
import {db} from '../firebase'
import dummyData from '../containers/dummyData'
const gamesRef = db.collection('games')

const initialState = {
  allGames: []
}

// ACTION TYPE
const FETCH_ALL_GAMES = 'FETCH_ALL_GAMES'
const CREATE_GAME = 'CREATE_GAME'
const END_GAME = 'END_GAME'

// ACTION CREATOR
export const fetchGames = () =>
  dispatch =>
  gamesRef.on('value', snapshot => {
      dispatch({
        type: FETCH_ALL_GAMES,
        payload: snapshot.val()
      })
    })

export const createGame = () =>
  dispatch =>
    gamesRef.set(dummyData)

export const endGame = (key) =>
  dispatch =>
  gamesRef.child(key).remove()

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GAMES:
      return Object.assign({}, state, {allGames: action.payload})
    default:
      return state
  }
}