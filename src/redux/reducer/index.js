import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice
import searchSlice from "./SearchReducer/index"
const rootReducer = combineReducers({
  user: authSlice,
  search: searchSlice
 
});

export default rootReducer;
