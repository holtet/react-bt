import * as types from '../actions/actionTypes';

export default function profileReducer(
  state = {
    // yeasts: [],
    // yeastTypes: [],
    // equipments: [],
    // equipmentTypes: [],
    //    hopTypes: undefined,
  },
  action
) {
  switch (action.type) {
    case types.LOAD_PROFILE_SUCCESS:
      console.log(JSON.stringify(action));
      return {
        ...state,
        [action.entity]: action.profile,
      };
    default:
      return state;
  }
}
