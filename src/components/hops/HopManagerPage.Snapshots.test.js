import React from 'react';
import HopManagerPage from './HopManagerPage';
import renderer from 'react-test-renderer';
import { hops, hopTypes } from '../../tools/mockData';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({
  hopTypes: hopTypes,
  hops: hops,
  items: { hopTypes: hopTypes, hops: hops },
});

it("sets submit button label 'Saving...' when saving is true", () => {
  console.log(JSON.stringify(hops[0]));

  const tree = renderer.create(
    <Provider store={store}>
      <HopManagerPage
        item={hops[0]}
        itemTypes={hopTypes}
        itemType={hopTypes[0]}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving
        match={{ params: { index: 0 } }}
        history={{}}
      />
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});
