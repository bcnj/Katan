import { combineReducers } from 'redux'
import gameReducer from './games'
import userReducer from './user'
import currentGameReducer from './currentGame'

const rootReducer = combineReducers({
  games: gameReducer,
  currentGame: currentGameReducer,
  user: userReducer
})

export default rootReducer
