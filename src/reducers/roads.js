import { GET_ROADS, SET_ROAD } from '../actions/types'

const roadsReducer = function(roads = [], action) {
  switch (action.type) {
    case GET_ROADS:
      return action.roads
    default:
      return roads
  }
}

export default roadsReducer
