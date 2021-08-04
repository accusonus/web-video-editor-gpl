import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.css';

import withWindowDimensions from '../../hoc/withWindowDimensions.js';

class Banner extends Component {

  /*
   * Get current layout, depending on window dimensions
   */
  getCurrentLayout = () => {
    if (this.props.isMobileSized || this.props.isTabletSized) 
      return styles.mobileLayout;
    return styles.desktopLayout;
  }

  /*
   * By clicking the Free Online Video Cutter logo, trigger getBackHome function of App 
   * (that gets you back on Home Page)
   */
  logoIsClicked = () => {
    this.props.getBackHome();
  }

  render() {
    return (
      <div className={this.getCurrentLayout()}>
        <div className={styles.banner}>
          <div className={styles.bannerContainer}>
            <div className={styles.bannerText}>
              <a onClick={this.logoIsClicked}>Free Online Video Cutter</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  getBackHome: PropTypes.func,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(Banner);
