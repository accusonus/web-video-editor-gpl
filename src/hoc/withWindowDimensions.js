/*
 * The following Higher Order Component (HOC)
 * wraps any other component and provides extra props about the layout
 */

import React, { Component } from 'react';

export default function withWindowDimensions(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    state = { width: 1920, height: 1080 };

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
      return (
        <WrappedComponent
          isMobileSized={this.state.width < 768}
          isTabletSized={this.state.width >= 768 && this.state.width < 960}
          isDesktopSized={this.state.width >= 960}
          {...this.props}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }
  };
}
