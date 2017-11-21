import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'
import userReducer from './user'
import currentGameReducer from './currentGame'

const rootReducer = combineReducers({
    build: buildReducer,
    games: gameReducer,
    currentGame: currentGameReducer,
    user: userReducer
});

export default rootReducer;
