import React from 'react';
import renderer from 'react-test-renderer';
import Download from './Download';

describe('Download', () => {
  it('Renders without crashing', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Download
        result={'result'}
        fileName={'filename'} 
      />
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
