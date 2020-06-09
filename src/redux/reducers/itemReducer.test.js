import itemReducer from './itemReducer';
import actions from '../actions/hopActions';

it('should add hop when passed CREATE_SUCCESS', () => {
  // arrange
  const initialState = [
    {
      title: 'A',
    },
    {
      title: 'B',
    },
  ];

  const newHop = {
    title: 'C',
  };

  const action = actions.createSuccess(newHop);

  // act
  const newState = itemReducer(initialState, action);

  // assert
  expect(newState.items.hops.length).toEqual(3);
  expect(newState.items.hops[0].title).toEqual('A');
  expect(newState.items.hops[1].title).toEqual('B');
  expect(newState.items.hops[2].title).toEqual('C');
});
