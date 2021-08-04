import React, { Component } from 'react';
import styles from './Cutbutton.module.css';
import PropTypes from 'prop-types';

import withWindowDimensions from '../../../hoc/withWindowDimensions.js';

class Cutbutton extends Component {
  /*
   * Get current layout, depending on window dimensions
   */
  getCurrentLayout = () => {
    if (this.props.isMobileSized || this.props.isTabletSized) 
      return styles.mobileLayout;
    return styles.desktopLayout;
  }

  /*
   * Cut the video, by calling updateTrimmedFile function
   */
  cutVideo = () => {
    // startTrim and endTrim are both valid
    if (this.props.startTrim !== undefined && this.props.endTrim !== undefined) {
      this.props.updateTrimmedFile();
    }
  }

  render() {
    return (
      <div className={this.getCurrentLayout()}>
        <div className={styles.cutbutton}>
          <button onClick={this.cutVideo}>CUT</button> 
        </div>
      </div>
    );
  }
}

Cutbutton.propTypes = {
  startTrim: PropTypes.number,
  endTrim: PropTypes.number,
  updateTrimmedFile: PropTypes.func,
  editingMode: PropTypes.string,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(Cutbutton);
