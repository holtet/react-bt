import * as types from '../actions/actionTypes';

// Handles yeasts, yeastTypes, equipments; yeastTypes: [],
export default function itemReducer(
  state = {
    malts: [],
    maltTypes: [],
    yeasts: [],
    yeastTypes: [],
    equipments: [],
    equipmentTypes: [],
    hops: [],
    hopTypes: [], //{ items: [], profile: null },
  },
  action
) {
  let newList = undefined;
  let currentList = undefined;

  console.log(JSON.stringify(action));

  switch (action.type) {
    case types.LOAD_SUCCESS:
      return {
        ...state,
        [action.entity]: action.items,
      };
    //      [action.entity]: { ...[action.entity], items: action.items },
    // switch (action.entity) {
    //   case 'yeasts':
    //     return { ...state, yeasts: action.items };
    //   default:
    //     return state;
    // }

    case types.CREATE_SUCCESS:
      console.log('Created yeast ' + JSON.stringify(action.item));
      newList = [...state[action.entity], { ...action.item }];
      return { ...state, [action.entity]: newList };

    case types.UPDATE_SUCCESS:
      // debugger;
      currentList = state[action.entity];
      newList = currentList.map((item) =>
        item._links.self.href === action.item._links.self.href
          ? action.item
          : item
      );
      return { ...state, [action.entity]: newList };
    case types.DELETE_SUCCESS:
      console.log(action);
      // console.log(action.yeastDefinitionHref);
      // console.log('state size ' + state.length);
      // state.map((s) => console.log(s.name));
      newList = state[action.entity].filter(
        (item) => item._links.self.href !== action.itemHref
      );
      console.log('newstate size ' + newList.length);
      return { ...state, [action.entity]: newList };

    default:
      return state;
  }
}
