import { GET_GAME } from '../actions/types'

const gameReducer = function(game = {}, action) {
  switch (action.type) {
    case GET_GAME:
      return action.game
    default:
      return game
  }
}

export default gameReducer
