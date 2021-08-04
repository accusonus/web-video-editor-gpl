/* 
  Player component: in this component we take the video source 
  and display the video through a simple player 
*/

import React, { Fragment, Component } from 'react';
import playerStyle from './Player.module.css';
import PropTypes from 'prop-types';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Video file in playable form
      playable: this.props.playable,
    };
  }

  /* 
   * we get the exact time the video is right now
   */
  getVideoCurrentTime = (evt) => { 
    // prop is missing so return nothing
    // (this one's go for the trimmed video Player)
    if (!this.props.setVideoCurrentTime) {
      return;
    }

    // pass video's current time to the Playhead
    this.props.setVideoCurrentTime(evt.target.currentTime);

    // in order to play video's section that is selected by start and end trim times ONLY:
    // if video's current time is >= of end trim time, pause and return back at the start trim time of the video
    const videoplayer = document.getElementById('videoPlayer'); 
    if (evt.target.currentTime >= this.props.endTrim){
      videoplayer.pause();
      videoplayer.currentTime = this.props.startTrim;
    }
  }

  render() {
    return (
      <Fragment>
        <div className={playerStyle.container}>
          <div className={playerStyle.playerContainer}>
            <div className={playerStyle.player}>
              {this.state.playable &&
               <video
                 controls
                 onTimeUpdate={this.getVideoCurrentTime} 
                 id="videoPlayer"
               >
                 <source src={this.state.playable}/>
               </video>  
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Player.propTypes = {
  playable: PropTypes.string,
  setVideoCurrentTime: PropTypes.func,
  startTrim: PropTypes.number,
  endTrim: PropTypes.number,
};

export default Player;
