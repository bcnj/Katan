import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './game'

const rootReducer = combineReducers({
    build: buildReducer,
    game: gameReducer,
});

export default rootReducer;
