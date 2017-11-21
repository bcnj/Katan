import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'
import userReducer from './user'
import tilesReducer from './tiles'
import currentGameReducer from './currentGame'

const rootReducer = combineReducers({
    tiles: tilesReducer,
    build: buildReducer,
    games: gameReducer,
    currentGame: currentGameReducer,
    user: userReducer
});

export default rootReducer;
