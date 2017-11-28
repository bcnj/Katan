import {
  FETCH_ALL_GAMES,
  SET_PLAYER,
  SET_USER,
  FETCH_ONE_GAME
} from './types'
import { db } from '../firebase'

// game
export const fetchGames = () => dispatch =>
  db.collection('games').onSnapshot(snap => {
    dispatch({
      type: FETCH_ALL_GAMES,
      payload: snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  })

export const fetchSingleGame = id => dispatch =>
  db
    .collection('games')
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

export const setPlayer = payload => ({
  type: SET_PLAYER,
  payload
})
