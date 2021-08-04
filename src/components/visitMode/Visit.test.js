import React from 'react';
import renderer from 'react-test-renderer';
import Visit from './Visit';

describe('Visit', () => {
  it('Renders without crashing', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Visit />
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
