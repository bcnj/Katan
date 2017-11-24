import { FETCH_ONE_GAME } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ONE_GAME:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
