// // import firebase from
// const GET_TILES = 'GET_TILES'
// const SET_ROBBER = 'SET_ROBBER'
// const ADD_CHILD = 'ADD_CHILD'

// const getTiles = tiles => ({
//   type: GET_TILES,
//   tiles
// });

// const setRobber = tile => ({
//   type: SET_ROBBER,
//   tile
// });

// const addChild = tile => ({
//   type: ADD_CHILD,
//   tile
// });

// export const setRobberThunk = (tileId) {
//   return dispatch => {
//     const tile = firebase.doc('katan/tileNodes').document(tileId);
//     const action = setRobber(tile);
//     diapatch(action);
//     })
//   }
// }

// export const addChildThunk = (tileId,child) {
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

// const tilesReducer = function(tiles = [], action) {
//   switch (action.type) {
//     case GET_TILES:
//       return action.tiles;
//     case ADD_CHILD:
//       const otherTiles = tiles.filter((tile)=> tile.id !== action.tile.id)
//       return [...otherTiles, action.tile];
//     case SET_ROBBER:
//     const otherTiles = tiles.filter((tile)=> tile.id !== action.tile.id)
//     return [...otherTiles, action.tile];
//     default:
//       return campuses;
//   }}

