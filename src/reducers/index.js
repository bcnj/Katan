import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'
import userReducer from './user'
// import tilesReducer from './tiles'
import currentGameReducer from './currentGame'
import intersectionsReducer from './intersections'

const rootReducer = combineReducers({
    intersections: intersectionsReducer,
    // tiles: tilesReducer,
    build: buildReducer,
    games: gameReducer,
    currentGame: currentGameReducer,
    user: userReducer
});

export default rootReducer;
