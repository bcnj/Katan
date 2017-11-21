import { GET_TILES, SET_ROBBER } from './types'

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

export const tilesReducer
