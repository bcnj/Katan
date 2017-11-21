import { db } from '../firebase'
import { GET_TILES, SET_ROBBER } from './types'

//need to figure how to pass this, etc., otherwise functions work
const currentGame = "whatever the current game is"

const getTiles = tiles => ({
  type: GET_TILES,
  tiles
})

const setRobber = tile => ({
  type: SET_ROBBER,
  tile
})

export const getTilesThunk = () => {
  return dispatch => {
    db
      .collection('testGames')
      .doc(currentGame)
      .get()
      .then(doc => {
        let tiles = doc.data().tileNodes
        const action = getTiles(tiles)
        dispatch(action)
      })
  }
}

export const setRobberThunk = (tileId, tF) => {
  if (tF === true) {
    return dispatch => {
      let robberUpdate = {}
      robberUpdate[`tileNodes.${tileId}.robber`] = false
      db
        .collection('testGames')
        .doc(currentGame)
        .update(robberUpdate)
    }
  } else {
    return dispatch => {
      let robberUpdate = {}
      robberUpdate[`tileNodes.${tileId}.robber`] = true
      db
        .collection('testGames')
        .doc('X59pZQsmXTNxoXNiTEke')
        .update(robberUpdate)
    }
  }
}

const tilesReducer = function(tiles = [], action) {
  switch (action.type) {
    case GET_TILES:
      return action.tiles
    case SET_ROBBER:
      var otherTiles = tiles.filter(tile => tile.id !== action.tile.id)
      return [...otherTiles, action.tile]
    default:
      return tiles
  }
}
