/* 
 *  TimelineFooter component: in this component we display video's final time output
 */

import React, { Component } from 'react';
import styles from './TimelineFooter.module.css';
import PropTypes from 'prop-types';

import { sec2duration } from '../../../utils/time';

class TimelineFooter extends Component {

  /*
   * Compute the length and if it's >=0 display it 
   * If it's not, then startTrim and/or endTrim are not valid/inserted so display an error message
   */ 

  render() {
    const length = this.props.endTrim - this.props.startTrim;

    if (length > 0)
      return (
        <div className={styles.output}>
          Final Output &nbsp; <span>{sec2duration(length)}</span>
        </div>
      );

    return (
      <div className={styles.output}>
        Please select valid start and end time
      </div>
    );
  }
}

TimelineFooter.propTypes = {
  startTrim: PropTypes.number,
  endTrim: PropTypes.number,
};

export default TimelineFooter;
