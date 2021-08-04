import React from 'react';
import renderer from 'react-test-renderer';
import Timeline from './Timeline';

describe('Timeline', () => {
  it('Renders without crashing', () => {
    let wrapper, tree;
    
    wrapper = renderer.create(
      <Timeline/>
    );
    
    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();

    wrapper = renderer.create(
      <Timeline
        duration={18}
        startTrim={10.0}
        endTrim={15.2} 
        current={11}
      />
    );
  
    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
