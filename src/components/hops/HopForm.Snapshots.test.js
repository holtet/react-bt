import React from 'react';
import HopForm from './HopForm';
import renderer from 'react-test-renderer';
import { hops, hopTypes } from '../../tools/mockData';

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <HopForm
      hop={hops[0]}
      hopTypes={hopTypes}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );
  //   console.log(tree.toJSON());
  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <HopForm
      hop={hops[0]}
      hopTypes={hopTypes}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );
  //   console.log(tree.toJSON());
  expect(tree).toMatchSnapshot();
});
