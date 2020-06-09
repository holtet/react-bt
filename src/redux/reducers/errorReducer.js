import * as types from '../actions/actionTypes';

export default function errorReducer(state = null, action) {
  switch (action.type) {
    case types.DELETE_ERROR:
      console.log('Got error ' + JSON.stringify(action));
      return action.err;
    case types.CLEAR_ERROR:
      console.log('Clear error');
      return null;
    default:
      return state;
  }
}
