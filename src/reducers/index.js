import { combineReducers } from 'redux';
import buildReducer from './build'

const rootReducer = combineReducers({
    build: buildReducer
});

export default rootReducer;
