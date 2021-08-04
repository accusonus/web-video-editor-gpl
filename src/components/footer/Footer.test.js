import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('Footer', () => {
  it('Renders without crashing', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Footer/>
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Mobile rendering', () => {
    let wrapper;
  
    wrapper = renderer.create(
      <Footer
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
      <Footer
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
      <Footer
        isMobileSized={false}
        isTabletSized={false}
        isDesktopSized={true}
      />
    );
  
    let tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
