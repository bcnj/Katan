import { BUILD_CITY, BUILD_SETTLEMENT, FETCH_ALL_GAMES, CREATE_GAME, END_GAME, SET_PLAYER, SET_USER, FETCH_ONE_GAME } from './types'
import {db} from '../firebase'
import dummyData from '../dummyData'

const gamesRef = db.collection('games')

// build
export const buildSettlement = () => ({ type: BUILD_SETTLEMENT, p1_settlement: true })
export const buildCity = () => ({ type: BUILD_CITY, p1_city: true })

// game
export const fetchGames = () =>
  dispatch =>
  db.collection('testGames')
  .onSnapshot(snap => {
    dispatch({
      type: FETCH_ALL_GAMES,
      payload: snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
    })
  })

export const fetchSingleGame = (id) =>
  dispatch =>
  db.collection('testGames').doc(`${id}`)
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

export const setPlayer = payload => ({
  type: SET_PLAYER,
  payload
})
