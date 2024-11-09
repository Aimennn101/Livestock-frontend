import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import livestockReducer from './reducers/livestockReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  livestock: livestockReducer,
});

export default rootReducer;
