import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'

const rootReducer = combineReducers({
    build: buildReducer,
    games: gameReducer,
});

export default rootReducer;
