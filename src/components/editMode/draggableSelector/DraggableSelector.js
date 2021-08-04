/* 
  DraggableSelector component: in this component the trim selection box is created
  Also the Trim time is changed by mouse while clicking and dragging (with Draggable JS) 
  the start and finish of the timeline trim selection box
*/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import styles from './DraggableSelector.module.css';

class DraggableSelector extends Component {

  constructor(props){
    super(props);
    // track timeline's width if window is resized after rendering
    this.timelineContainerRef = React.createRef();
    // right and left borders of Draggable Selector box are 0.5em. Since Draggable works in px, we use 10px instead for our calculations
    this.borderWidth = 10;
    // in order to not have a conflict between the two handlers, update the limit of the other handler
    // by leaving 25px space between left and right handler (25px are calculated by trial and error between the two Draggable elements)
    this.handlerLimit = 25;
    // again by trial and error, a space of 5px is used for an indicator of the right bound (limit) of the right handler
    this.rightHandlerBound = 5;

    this.state = { 
      // the left handler's position
      leftHandlerPosition: 0,
      // the right handler's position
      rightHandlerPosition: 0,
      // the width of the timeline
      timelineWidth: undefined,
      // the limit of how much the left handler can go on the right in the timeline
      leftHandlerLimit: undefined,
      // the limit of how much the right handler can go on the left in the timeline
      rightHandlerLimit: undefined,
    };
  }

  componentDidMount () {
    // if there's not a timeline, return
    if (!this.timelineContainerRef.current)
      return;

    this.setState({
      timelineWidth: this.timelineContainerRef.current.offsetWidth,
      // subtract the right border width from the total width of the Selector Container
      leftHandlerLimit: this.timelineContainerRef.current.offsetWidth - this.borderWidth,
      // subtract the left border width from the total width of the Selector Container
      rightHandlerLimit: this.timelineContainerRef.current.offsetWidth - this.borderWidth
    });
  }

  componentDidUpdate () {
    // update timeline's width if window was resized
    if (this.state.timelineWidth !== this.timelineContainerRef.current.offsetWidth)
      this.setState({timelineWidth: this.timelineContainerRef.current.offsetWidth});
  }

  /*
   * Handles the onDrag event of the left Handler (the one that sets the Start trim time)
   */
  leftDragHandler = (e, d) => {
    // get the left handler's position before the drag event
    const x = this.state.leftHandlerPosition;
    // update it to the current position and use the handler limit between left and right handler
    this.setState({
      leftHandlerPosition: x + d.deltaX,
      rightHandlerLimit: this.state.timelineWidth - (x + d.deltaX) - this.handlerLimit
    });

    // calculate the start trim time based on handler's position
    const startTrimTime = (this.state.leftHandlerPosition * this.props.duration) / this.state.timelineWidth;
    this.props.setStartTrim(startTrimTime);
  };

  /* 
   * Handles the onDrag event of the right Handler (the one that sets the End trim time)
   */
  rightDragHandler = (e, d) => {
    // get the right handler's position before the drag event
    const x = this.state.rightHandlerPosition;
    // update it to the current position and use the handler limit between left and right handler
    this.setState({
      rightHandlerPosition: x + d.deltaX,
      leftHandlerLimit: this.state.timelineWidth + (x + d.deltaX) - this.handlerLimit
    });

    // rightHandlerPosition returns a negative number that is a reflection of actual timeline (since it goes backwards in the timeline)
    // so we calculate right handlers correct position in the timeline
    const optimizedRightHandlerPosition = this.state.timelineWidth + this.state.rightHandlerPosition - this.rightHandlerBound;

    // calculate the end trim time based on handler's actual position
    const leftTrimTime = (optimizedRightHandlerPosition * this.props.duration) / this.state.timelineWidth;
    this.props.setEndTrim(leftTrimTime);
  }

  /*
   * with getWidthForSelectionBox we find the proper width numbers for the Trim Selection Box implementation
   * we use it in the Trim selection box (the blue box that shows the trimmed video)
   * and also for the 2 Trim selection Masks (the areas that the video is going to be trimmed, shown with a blacker background)
   * The timeline is divided equally depending on the video's duration, so in order to find the proper width 
   * start and end given times are subtracted, divided by the total duration
   */
  getWidthForSelectionBox (startTime, endTime, duration) {
    const totalTime = endTime - startTime;
    if (totalTime < 0 || !totalTime)
      return;
    const width = (totalTime / duration) * 100;
    return `${width}%`;
  }

  /*
   * getLeftPosition 'feeds' how much left has the Selection Box to move inside timeline, depending on video's current time
   * the logic is that the Selection box can move inside timeline 0% left (start of timeline) and '100%' left (end of timeline)
  */
  getLeftPosition (startTime, duration) {
    if (startTime === undefined) 
      return '0%';
  
    // we calculate div's position based on how left it can move inside timeline (100%) divided by the video's duration 
    // then we multiply with current time of the video and stringify it to % to pass it as an inline style
    // with this way we can control the given div inside timeline with a simple approach
    var rate = 100/duration;
    var ratetime = startTime * rate;
    return `${ratetime}%`;
  }

  /*
   * Trim selection box is controlled by its width and how much left it will move depending on start trim time
   * Trim selection masks are filling the not trimmable clips on the left and right side of the timeline 
   * Trim selection box has a left and a right border that are covered by a Draggable element 
   * In this way we can control the box and drag it to the desired times
   */
  render() {
    return (
      <Fragment>
        <div className={styles.selectionBox}
          style={{
            left: this.getLeftPosition(this.props.startTrim, this.props.duration), 
            width: this.getWidthForSelectionBox(this.props.startTrim, this.props.endTrim, this.props.duration)}} 
        />
        <div className={styles.selectionMask}
          style={{
            left: '0', 
            width: this.getWidthForSelectionBox(0, this.props.startTrim, this.props.duration)}} 
        />
        <div className={styles.selectionMask}
          style={{
            right: '0', 
            width: this.getWidthForSelectionBox(this.props.endTrim, this.props.duration, this.props.duration)}}
        />

        <div className={styles.timelineContainer} ref={this.timelineContainerRef}>
          <Draggable
            axis="x"
            handle="#handle"
            bounds={{left: 0, right: this.state.leftHandlerLimit}}
            positionOffset={{x: 0, y: 0}}
            onDrag={this.leftDragHandler}>
            <div className={styles.handleContainer}>
              <div id="handle" className={styles.handle} />
            </div>
          </Draggable>  

          <Draggable
            axis="x"
            handle="#handle"
            bounds={{left: -(this.state.rightHandlerLimit), right: this.rightHandlerBound}}
            positionOffset={{x:(this.state.timelineWidth - this.borderWidth), y:0}}
            onDrag={this.rightDragHandler}>
            <div className={styles.handleContainer}>
              <div id="handle" className={styles.handle}/>
            </div>
          </Draggable>  
        </div>
      </Fragment>
    );
  }
}

DraggableSelector.propTypes = {
  duration: PropTypes.number,
  startTrim: PropTypes.number,
  endTrim: PropTypes.number,
  setStartTrim: PropTypes.func,
  setEndTrim: PropTypes.func
};

export default DraggableSelector;
