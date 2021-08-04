import React, { Component } from 'react';
import styles from './WaitingPage.module.css';
import PropTypes from 'prop-types';

import withWindowDimensions from '../../hoc/withWindowDimensions';

class WaitingPage extends Component {
  /*
   * Get current layout, depending on window dimensions
   */
  getCurrentLayout = () => {
    if (this.props.isMobileSized || this.props.isTabletSized) 
      return styles.mobileLayout;
    return styles.desktopLayout;
  }


  /*
   * Waiting page is used in 2 conditions: while processing the video and while editing it
   * So depending on the condition, a proper message is returned
   */
  getMessage = () => {
    if (this.props.mode === 'upload')
      return (
        <div className={styles.text}>Processing your Video. <br/> It usually takes up to 30sec. <br/> Please Wait</div>
      );
    return (
      <div className={styles.text}>Editing your Video. <br/> It usually takes up to 30sec. <br/> Please Wait</div>
    );
  }

  render() {
    return (
      <div className={this.getCurrentLayout()}>
        <div className={styles.waitingPageContainer}>
          <div className={styles.messageContainer}>
            <div className={styles.circle} />
            {this.getMessage()}
          </div>
        </div>
      </div>
    );
  }
}

WaitingPage.propTypes = {
  mode: PropTypes.string,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(WaitingPage);
