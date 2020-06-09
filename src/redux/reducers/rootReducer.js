import { combineReducers } from 'redux';
import items from './itemReducer';
import profiles from './profileReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  error,
  items,
  profiles,
});

export default rootReducer;
