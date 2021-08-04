/* 
  Timeline component: in this component we display video's timeline
  (a rectangle presents the timeline for now and we show first and last videos's frame)
*/

import React, { Component } from 'react';
import timelineStyle from './Timeline.module.css';
import { Frame } from '../frame';
import PropTypes from 'prop-types';
import { DraggableSelector } from '../draggableSelector';

class Timeline extends Component {

  /*
   * getLeftPosition 'feeds' how much left has the playhead to move inside timeline, depending on video's current time
   * the logic is that the playhead can move inside timeline 0% left (start of timeline) and '100%' left (end of timeline)
  */
  getLeftPosition = (currentTime, duration) => {
    if (currentTime === undefined) 
      return '0%';
    
    // we calculate div's position based on how left it can move inside timeline (100%) divided by the video's duration 
    // then we multiply with current time of the video and stringify it to % to pass it as an inline style
    // with this way we can control the given div inside timeline with a simple approach
    var rate = 100/duration;
    var ratetime = currentTime * rate;
    return `${ratetime}%`;
  };


  /*
   * getDisplayInfo hides playhead if currentTime is bigger than the clip's end trim time and re-appears it in the start trim time
   * this is applied in order to avoid the crawling of the Playhead backwards at the start trim time when the clip is over
   */
  getDisplayInfo = (currentTime, endTrimTime) => {
    if (currentTime >= endTrimTime) 
      return 'none';
        
    return 'inline-flex';
  }

  /* 
   * Frames are actually simple HTML5 videos without the controls attribute
   * In order to get x Frames, duration is split to x different sections (see position inside Frame component)
   * The general idea is that after Frames are created, place them (quite equally) inside timeline rectangle
  */
  getFrames = (frames, file, duration) => {
    let framesList = [];
    for (var i=0; i<frames; i++) {
      framesList.push(
        <div className={timelineStyle.frame} style={{left: `${i*(100/frames)}%`}} key={i}>
          <Frame file={file} position={duration * (i/frames)} />
        </div>
      );
    }
    return (
      <div className={timelineStyle.frameContainer}>
        {framesList}
      </div>
    );
  };

  render() {
    return (
      <div className = {timelineStyle.timelineWrapper}>
        <div className={timelineStyle.rectangle}>
          <div className={timelineStyle.playhead} id={timelineStyle.playhead}
            style={{left: this.getLeftPosition(this.props.currentTime, this.props.duration),
              display: this.getDisplayInfo(this.props.currentTime, this.props.endTrim)}}> 
            <div className={timelineStyle.playheadLine}></div>
            <div className={timelineStyle.playheadCircle}></div>
          </div>
          {this.getFrames(8, this.props.file, this.props.duration)}
          <DraggableSelector 
            startTrim={this.props.startTrim} 
            endTrim={this.props.endTrim} 
            duration={this.props.duration} 
            setStartTrim={this.props.setStartTrim}
            setEndTrim={this.props.setEndTrim}
          />
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  file: PropTypes.object,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  startTrim: PropTypes.number,
  endTrim: PropTypes.number,
  setStartTrim: PropTypes.func,
  setEndTrim: PropTypes.func,
};

export default Timeline;
