import {SET_USER, SET_PLAYER} from '../actions/types'

const initialState = {name: 'guest'}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.payload)
    case SET_PLAYER:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}