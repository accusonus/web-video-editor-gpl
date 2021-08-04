import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
  it('Renders without crashing', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Header/>
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Mobile rendering', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Header
        isMobileSized={true}
        isTabletSized={false}
        isDesktopSized={false}
      />
    );

    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Tablet rendering', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Header
        isMobileSized={false}
        isTabletSized={true}
        isDesktopSized={false}
      />
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Desktop rendering', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Header
        isMobileSized={false}
        isTabletSized={false}
        isDesktopSized={true}
      />
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
