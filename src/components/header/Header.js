import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withWindowDimensions from '../../hoc/withWindowDimensions';
import styles from './Header.module.css';
import config from '../../utils/config/config.js';

class Header extends Component {

  /*
   * Get current layout, depending on window dimensions
   */
  getHeaderClasses = () => {
    const headerClasses = [styles.footer];
    this.props.isMobileSized || this.props.isTabletSized ? headerClasses.push(styles.mobileLayout) : headerClasses.push(styles.desktopLayout);
  
    return headerClasses.join(' ');
  }

  render() {
    return (
      <div className={this.getHeaderClasses()}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}> 
            <a
              className={styles.logo}
              href={config.MAIN_MENU_ACCUSONUS_LOGO.url}
              title={config.MAIN_MENU_ACCUSONUS_LOGO.title}
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 125.71 40.06'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230e0e14;%7D%3C/style%3E%3C/defs%3E%3Cg%3E%3Cpath class='cls-1' d='M9.64,24.56s-.15-1.08-.2-2.11A4.88,4.88,0,0,1,5,24.94c-3.11,0-5-2.07-5-6,0-3.62,1.93-5.73,4.79-7.09s4.6-2.91,4.6-5.59S8.65,1.69,6.08,1.69,2.67,3.48,2.67,6.25v.94H.84V6.25C.84,2.49,2.37,0,6.08,0s5.14,2.44,5.14,6.62V20.43c0,2,.2,4.13.2,4.13ZM9.39,10.1a7.46,7.46,0,0,1-3.56,3c-3,1.46-3.9,3.1-3.9,5.78,0,3,1.28,4.46,3.36,4.46s4.1-1.88,4.1-4.7Z'/%3E%3Cpath class='cls-1' d='M20.06,24.94c-3.26,0-5.39-2.16-5.39-6.43V6.43C14.68,2.16,16.8,0,20.06,0s5.39,2.11,5.39,6.43v.42H23.62V6.43c0-3.05-1.28-4.74-3.56-4.74S16.5,3.38,16.5,6.43V18.5c0,3.05,1.24,4.74,3.56,4.74s3.56-1.69,3.56-4.74v-.42h1.83v.42C25.45,22.82,23.27,24.94,20.06,24.94Z'/%3E%3Cpath class='cls-1' d='M33.9,24.94c-3.26,0-5.39-2.16-5.39-6.43V6.43C28.51,2.16,30.64,0,33.9,0s5.39,2.11,5.39,6.43v.42H37.46V6.43c0-3.05-1.28-4.74-3.56-4.74s-3.56,1.69-3.56,4.74V18.5c0,3.05,1.24,4.74,3.56,4.74s3.56-1.69,3.56-4.74v-.42h1.83v.42C39.28,22.82,37.11,24.94,33.9,24.94Z'/%3E%3Cpath class='cls-1' d='M65.52,6.86V5.64c0-2.25-1.09-3.94-3.26-3.94S58.8,3.19,58.8,5.54a5.36,5.36,0,0,0,2.12,4.23l4,3.48A7.17,7.17,0,0,1,67.75,19c0,3.52-2.08,5.92-5.58,5.92-4,0-5.49-2.82-5.49-6.11v-1h1.83v1c0,2.72,1.28,4.46,3.66,4.46S65.87,21.6,65.87,19a5.64,5.64,0,0,0-2.12-4.37l-4-3.48a6.9,6.9,0,0,1-2.82-5.64C56.93,2.16,58.85,0,62.26,0s5.09,2.25,5.09,5.64V6.86Z'/%3E%3Cpath class='cls-1' d='M76.15,24.94c-3.31,0-5.63-2.11-5.63-6.43V6.43C70.51,2.11,72.84,0,76.15,0s5.63,2.11,5.63,6.43V18.5C81.78,22.82,79.46,24.94,76.15,24.94ZM80,6.43c0-3.05-1.43-4.74-3.81-4.74s-3.81,1.69-3.81,4.74V18.5c0,3.05,1.43,4.74,3.81,4.74S80,21.56,80,18.5Z'/%3E%3Cpath class='cls-1' d='M94.73,24.56V6.43c0-3.19-1-4.74-3.31-4.74-2.52,0-3.85,1.93-3.85,5.26V24.56H85.73V.38h1.68V2.44A4.3,4.3,0,0,1,91.47,0c3.46,0,5.09,2,5.09,6.43V24.56Z'/%3E%3Cpath class='cls-1' d='M123.49,6.86V5.64c0-2.25-1.09-3.94-3.26-3.94s-3.46,1.5-3.46,3.85a5.36,5.36,0,0,0,2.12,4.23l4,3.48A7.17,7.17,0,0,1,125.71,19c0,3.52-2.08,5.92-5.58,5.92-4,0-5.49-2.82-5.49-6.11v-1h1.83v1c0,2.72,1.28,4.46,3.66,4.46s3.71-1.69,3.71-4.27a5.64,5.64,0,0,0-2.12-4.37l-4-3.48a6.9,6.9,0,0,1-2.82-5.64c0-3.38,1.93-5.54,5.34-5.54s5.09,2.25,5.09,5.64V6.86Z'/%3E%3Cpath class='cls-1' d='M109.8.38V18.5c0,3.05-1.43,4.74-3.8,4.74s-3.81-1.69-3.81-4.74V.38h-1.83V18.5c0,4.32,2.32,6.43,5.63,6.43s5.63-2.11,5.63-6.43V.38Z'/%3E%3Cpath class='cls-1' d='M51.86.38V18.5c0,3.05-1.43,4.74-3.81,4.74s-3.81-1.69-3.81-4.74V.38H42.42V18.5c0,4,2,6.08,4.87,6.39V36.63a1.79,1.79,0,0,0-1.12,1.64,1.89,1.89,0,0,0,3.78,0,1.79,1.79,0,0,0-1.12-1.64V24.9c2.9-.31,4.87-2.41,4.87-6.39V.38Z'/%3E%3C/g%3E%3C/svg%3E"
                alt={config.MAIN_MENU_ACCUSONUS_LOGO.title}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
  hasSimplifiedHeader: PropTypes.bool,
  children: PropTypes.object,
};

Header.defaultProps = {  
  hasSimplifiedHeader: true,
};
  
export default withWindowDimensions(Header);
