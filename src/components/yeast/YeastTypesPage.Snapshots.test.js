import React from 'react';
import YeastTypesPageView from './YeastTypesPageView';
import renderer from 'react-test-renderer';
import { yeastTypes } from '../../tools/mockData';
import { BrowserRouter as Router } from 'react-router-dom';

it('has correct snapshot', () => {
  const tree = renderer.create(
    <Router>
      <YeastTypesPageView
        types={yeastTypes}
        onNewItemClick={jest.fn()}
        onDeleteClick={jest.fn()}
        redirectToTypePage={false}
      />
    </Router>
  );
  expect(tree).toMatchSnapshot();
});

it('has correct snapshot with redirect', () => {
  const tree = renderer.create(
    <Router>
      <YeastTypesPageView
        types={yeastTypes}
        onNewItemClick={jest.fn()}
        onDeleteClick={jest.fn()}
        redirectToTypePage={true}
      />
    </Router>
  );
  expect(tree).toMatchSnapshot();
});
