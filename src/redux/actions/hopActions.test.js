import hopActions from './hopActions';
import * as types from './actionTypes';
import { apiHops, hops } from '../../tools/mockData';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Hops Thunk', () => {
    it('should create LOAD_SUCCESS when loading hops', () => {
      fetchMock.mock('*', {
        body: apiHops,
        headers: { 'content-type': 'application/json' },
      });

      const expectedActions = [
        { type: types.LOAD_SUCCESS, entity: 'hops', items: hops },
      ];

      const store = mockStore({ hops: [] });
      return store.dispatch(hopActions.loadAll()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('createHopSuccess', () => {
  it('should create a CREATE_SUCCESS action', () => {
    //arrange
    const hop = hops[0];
    const expectedAction = {
      type: types.CREATE_SUCCESS,
      entity: hops,
      item: hop,
    };

    //act
    const action = hopActions.createSuccess(hop);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
