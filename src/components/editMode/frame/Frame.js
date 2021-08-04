/* 
  Frame component: in this component we display video's frame
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Frame.module.css';
import { returnSource } from '../../../utils/various';

class Frame extends Component {

  /* 
   * Get source: get the video source at a certain time 
   * (https://stackoverflow.com/questions/5981427/start-html5-video-at-a-particular-position-when-loading)
   */

  getSource = () => {
    return returnSource(this.props.file)  + '#t=' + this.props.position;
  }

  /*
   * To get the desired Frame: In a video file (with controls removed) just display the source of the video
   */

  render() {
    return (
      <div className={styles.frame}>
        <video>
          <source src={this.getSource()} />
        </video> 
      </div>
    );
  }
}

Frame.propTypes = {
  file: PropTypes.object,
  position: PropTypes.number,
};

export default Frame;
