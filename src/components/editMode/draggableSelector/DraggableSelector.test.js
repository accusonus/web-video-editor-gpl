import React from 'react';
import renderer from 'react-test-renderer';
import DraggableSelector from './DraggableSelector';

describe('DraggableSelector', () => {
  it('Renders without crashing', () => {
    let wrapper, tree;
  
    wrapper = renderer.create(
      <DraggableSelector/>
    );
  
    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();

    wrapper = renderer.create(
      <DraggableSelector
        duration={18}
        startTrim={10.0}
        endTrim={15.2} 
      />
    );

    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
