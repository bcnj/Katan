import { BUILD_CITY, BUILD_SETTLEMENT, FETCH_ALL_GAMES, CREATE_GAME, END_GAME, SET_PLAYER } from './types'
import {db} from '../firebase'
import dummyData from '../dummyData'

const gamesRef = db.collection('games')

// build
export const buildSettlement = () => ({ type: BUILD_SETTLEMENT, p1_settlement: true })
export const buildCity = () => ({ type: BUILD_CITY, p1_city: true })

// game
export const fetchGames = () =>
  dispatch =>
  db.collection('games')
  .onSnapshot(snap => {
    dispatch({
      type: FETCH_ALL_GAMES,
      payload: snap.docs.map(doc => doc.data())
    })
  })

// export const setPlayer = (gameId) =>
//   dispatch =>
//   db.doc(`games/${gameId}`)
//   .onSnapshot(snap => {

//   })