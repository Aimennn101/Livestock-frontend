import { combineReducers } from 'redux';
import authReducer from './authReducer';
import livestockReducer from './livestockReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  livestock: livestockReducer
});

export default rootReducer;
