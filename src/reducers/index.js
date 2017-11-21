import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'
import userReducer from './user'
import tilesReducer from './tiles'

const rootReducer = combineReducers({
    tiles: tilesReducer,
    build: buildReducer,
    games: gameReducer,
    user: userReducer
});

export default rootReducer;
