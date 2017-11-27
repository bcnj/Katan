import { FETCH_ALL_GAMES } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GAMES:
      return action.payload
    default:
      return state
  }
}
