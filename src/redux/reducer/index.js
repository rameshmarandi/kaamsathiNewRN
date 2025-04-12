import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice

const rootReducer = combineReducers({
  user: authSlice,
 
});

export default rootReducer;
