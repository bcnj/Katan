import { FETCH_ONE_GAME, ROLL_DICE } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ONE_GAME:
      return action.payload
    case ROLL_DICE:
      return action.payload
    default:
      return state
  }
}