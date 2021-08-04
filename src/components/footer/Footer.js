import React, { Component } from 'react';
import config from '../../utils/config/config.js';

import withWindowDimensions from '../../hoc/withWindowDimensions.js';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

class Footer extends Component {

  /*
   * Get current layout, depending on window dimensions
   */
  getFooterClasses = () => {
    const footerClasses = [styles.footer];
    this.props.isMobileSized || this.props.isTabletSized ? footerClasses.push(styles.mobileLayout) : footerClasses.push(styles.desktopLayout);
  
    return footerClasses.join(' ');
  }

  render() {
    return (
      <div className={this.getFooterClasses()}>
        <div className={styles.footerContainer}>
          <div className={styles.logo}>© 2021 Accusonus.com</div>
          <div className={styles.linksContainer}>
            <a href={config.PATH.terms} className={styles.link}>{config.FOOTER.terms}</a>
            <a href={config.PATH.patents} className={styles.link}>{config.FOOTER.patents}</a>
            <a href={config.PATH.policy} className={styles.link}>{config.FOOTER.policy}</a>
            <a href={config.PATH.source} className={styles.link}>{config.FOOTER.source}</a>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  mode: PropTypes.string,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(Footer);
