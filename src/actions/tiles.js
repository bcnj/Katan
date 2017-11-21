import { db } from '../firebase'

const GET_TILES = 'GET_TILES'
const SET_ROBBER = 'SET_ROBBER'
const ADD_CHILD = 'ADD_CHILD'

const getTiles = tiles => ({
  type: GET_TILES,
  tiles
})

const setRobber = tile => ({
  type: SET_ROBBER,
  tile
})

const addChild = tile => ({
  type: ADD_CHILD,
  tile
})

export const getTilesThunk = () => {
  return dispatch => {
    console.log(db)
    let tiles = db
      .collection('testGames')
      .document('X59pZQsmXTNxoXNiTEke')
      .get()
      .then(doc => console.log(doc.data().tileNodes))
    // const action = getTiles(tile)
    // dispatch(action)
  }
}

// export const addChildThunk = (tileId,child) => {
//   //aim to get the exact tile and add the child to the children array
//   return dispatch => {
//     const tile = firebase.collection('katan/tileNodes').doc(tileid).doc('children').add({
//       child
//     };
//     const action = addChild(child);
//     dispatch(action);
//     })
//   }
// }

const tilesReducer = function(tiles = [], action) {
  switch (action.type) {
    case GET_TILES:
      return action.tiles
    case ADD_CHILD:
      var otherTiles = tiles.filter(tile => tile.id !== action.tile.id)
      return [...otherTiles, action.tile]
    case SET_ROBBER:
      var otherTiles = tiles.filter(tile => tile.id !== action.tile.id)
      return [...otherTiles, action.tile]
    default:
      return tiles
  }
}
