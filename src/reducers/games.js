import { FETCH_ALL_GAMES, CREATE_GAME, END_GAME } from '../actions/types'
import _ from 'lodash';


const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_GAMES:
      return action.payload
    case END_GAME:
      return _.omit(state, action.payload)
    default:
      return state
  }
}