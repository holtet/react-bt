import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import initialState from './reducers/initialState';
import hopActions from './actions/hopActions';

it('Should handle creating hops', function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const hop = {
    year: 2017,
  };

  // act
  const action = hopActions.createSuccess(hop);
  store.dispatch(action);

  // assert
  const createdHop = store.getState().hops[0];
  expect(createdHop).toEqual(hop);
});
