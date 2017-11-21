import { db } from '../firebase'
import { GET_ROADS, SET_ROAD } from '../actions/types'

//need to figure how to pass this, etc., otherwise the functions work
const currentGame = 'whatever the current game is'

const getRoads = roads => ({
  type: GET_ROADS,
  roads
})

const setRoad = road => ({
  type: SET_ROAD,
  road
})

export const getRoadsThunk = () => {
  return dispatch => {
    db
      .collection('testGames')
      .doc(currentGame)
      .get()
      .then(doc => {
        let roads = doc.data().roadNodes
        console.log(roads)
        const action = getRoads(roads)
        dispatch(action)
      })
  }
}

//three in one
export const setRoadThunk = (roadId, player) => {
  let roadUpdate = {}
  roadUpdate[`roadNodes.${roadId}.player`] = player
  return dispatch => {
    db
      .collection('testGames')
      .doc(currentGame)
      .update(roadUpdate)
  }
}
