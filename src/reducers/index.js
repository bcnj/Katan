import { combineReducers } from 'redux';
import buildReducer from './build'
import gameReducer from './games'
import userReducer from './user'

const rootReducer = combineReducers({
    build: buildReducer,
    games: gameReducer,
    user: userReducer
});

export default rootReducer;
