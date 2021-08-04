import React from 'react';
import renderer from 'react-test-renderer';
import TimelineFooter from './TimelineFooter';

describe('TimelineFooter', () => {
  it('Renders without crashing', () => {
    let wrapper, tree;
  
    wrapper = renderer.create(
      <TimelineFooter />
    );
  
    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();

    wrapper = renderer.create(
      <TimelineFooter
        startTrim={10.0}
        endTrim={15.2} 
      />
    );

    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();

  });
});
