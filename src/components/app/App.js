/* 
 * App component: this component includes all the sub-components of our video app
 */

import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { Visit } from '../visitMode';
import { Result } from '../resultMode';
import { Banner } from '../banner';
import { Header } from '../header';
import { WaitingPage } from '../waitingPage';

import { Player } from '../editMode/player';
import { Timeline } from '../editMode/timeline';
import { Cutbutton } from '../editMode/cutbutton';
import { TimelineFooter } from '../editMode/timelineFooter';

import FFMPEG  from '../../utils/ffmpeg';
import { duration2sec, sec2duration } from '../../utils/time';
import { returnSource, formatSizeWithUnits, returnFileName } from '../../utils/various';

import withWindowDimensions from '../../hoc/withWindowDimensions.js';
import PropTypes from 'prop-types';
import config from '../../utils/config/config.js';

import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Various log info
      log: [],
      // File duration
      duration: undefined,
      // Keeps the whole video file when loaded from the browser
      file: undefined,
      // Keeps trimmed video (blob)
      fileTrimmed: undefined,
      // Keeps trimmed video's name (trimmed-result.extension)
      fileTrimmedName: undefined,
      // Keeps trimmed video's size (in MB)
      fileTrimmedSize: undefined,
      // Video current time
      currentTime: undefined,
      // Start trim time (final)
      startTrim: undefined,
      // End trim time (final)
      endTrim: undefined,
      // Keeps the input of start trim time (not the final one)
      startTrimFromTimeline: undefined,
      // Keeps the input of end trim time (not the final one)
      endTrimFromTimeline: undefined,
      // If it's true, then Waiting Page appears
      waitingPage: undefined,
      // Waiting Page returns a different message depending from where it's called 
      waitingMode: undefined,
      // Object to push in dataLayer
      videoCutterObject: undefined,
      // Video width
      videoWidth: undefined,
      // Video height
      videoHeight: undefined,
    };
  } 
  
  componentDidUpdate(prevProps, prevState) {
    // We need to learn file's duration
    if (this.state.file && !prevState.file) {
      this.updateDuration();
      this.setVideoCurrentTime(undefined);
    }

    // Find Video's dimensions when duration of video in state is updated
    if (this.state.duration && !prevState.duration && this.state.file!==undefined) {
      const videoplayer = document.getElementById('videoPlayer');
      videoplayer.onloadedmetadata = () => {
        this.setState({videoWidth: videoplayer.videoWidth, videoHeight: videoplayer.videoHeight});
      };
    }

    // Push dataLayer object when width and height of video in state are updated
    if (this.state.videoWidth && !prevState.videoWidth && this.state.videoHeight && !prevState.videoHeight && this.state.file!==undefined) {
      this.pushDLobject('Import video');
    }
  }

  /*
   * Create and push object to dataLayer
   */
  pushDLobject = (curEvent) => {
    // Create video event object
    const videoCutterObject = {
      event: curEvent,
      video: {
        format: this.state.file.type,
        length: (this.state.endTrim && this.state.startTrim)
          ?sec2duration(this.state.endTrim - this.state.startTrim, true)
          :sec2duration(this.state.duration, true),
        size: (this.state.fileTrimmedSize)
          ?this.state.fileTrimmedSize
          :formatSizeWithUnits(this.state.file.size),
        resolution: `${this.state.videoWidth}x${this.state.videoHeight}`
      }
    };

    // Send video event
    if (typeof window === 'undefined')
      return;

    if (!window.dataLayer)
      window.dataLayer = [];

    window.dataLayer.push(videoCutterObject);
  }

  /*
   * Get current layout, depending on window dimensions
   */
  getCurrentLayout = () => {
    if (this.props.isMobileSized || this.props.isTabletSized) 
      return styles.mobileLayout;
    return styles.desktopLayout;
  }

  /*
   * Get video's default start time
   */
  getDefaultStart = (startTime) => {
    this.setState({startTrim: startTime});
  }

  /*
   * Get video's default end time
   */
  getDefaultEnd = (endTime) => {
    this.setState({endTrim: endTime});
  }

  /* 
   * get video's current time in seconds
   */
  setVideoCurrentTime = (val) => {
    this.setState({currentTime: val});
  }

  /*
   * go back to edit page from result page -- redirect to previous page
   * get the default values again
   */
  getBackToEdit = () => {
    this.setState({
      fileTrimmed: undefined, 
      currentTime: undefined,
      startTrimFromTimeline: 0,
      endTrimFromTimeline: this.state.duration
    });
    this.getDefaultStart(0);
    this.getDefaultEnd(this.state.duration);
  }

  /*
   * Return to Home Page 
   */
  getBackHome = () => {
    this.setState({
      file: undefined,
      duration: undefined,
      fileTrimmed: undefined, 
      startTrim: undefined, 
      endTrim: undefined, 
      currentTime: undefined,
    });
    // refresh the page (for memory constraints)
    Router.reload();
  }

  /*
   * Updates duration of the stored file
   * Updates also the initial start trim (1/3) and end trim (2/3) time of the video
   */
  updateDuration = () => {
    this.setState({
      duration: undefined,
    });

    FFMPEG.process(
      this.state.file,
      ['-i', this.state.file.name, '-c:v', 'verbose'],
      () => {
        // Do nothing with the result
      },
      (msg) => {
        if (!msg || !msg.data.msg)
          return;

        this.setState((prevState) => {
          prevState.log.push(msg.data.msg);

          return prevState;
        });

        if (!this.state.duration) { 
          // This log info is about file duration
          // It is something like
          // FFMPEG LOG: Duration: 00:00:30.96, start: 0.000000, bitrate: 1624 kb/s
          // and we try to extract the "00:00:30.96"
          if (msg.data.msg.indexOf('Duration') >= 0){
            const duration = duration2sec(msg.data.msg.split(' ')[5].split(',')[0]);
            this.setState({ 
              duration: duration,
              waitingPage: undefined,
              waitingMode: undefined
            });
            this.getDefaultStart(0);
            this.getDefaultEnd(duration);
          }
        }
      }
    );
  };

  /*
   * Re-trims local file
   */
  updateTrimmedFile = () => {
    // Clean up first
    if (this.state.fileTrimmed) {
      this.setState({
        fileTrimmed: undefined
      });
    }

    if (this.state.endTrim <= this.state.startTrim)
      return;

    if (this.trimInProgress)
      return;

    this.trimInProgress = true;
    this.setState({
      waitingPage: true,
      waitingMode: 'trim'
    });
    FFMPEG.process(
      this.state.file,
      ['-ss', sec2duration(this.state.startTrim), '-i', this.state.file.name, '-c:v', 'copy', '-c:a', 'copy', '-t', sec2duration(this.state.endTrim - this.state.startTrim), `trimmed-${this.state.file.name}`],
      (e) => {
        const video = e.result;

        this.setState({
          fileTrimmed: window.URL.createObjectURL(video),
          fileTrimmedName: returnFileName(video.name),
          fileTrimmedSize: formatSizeWithUnits(video.size),
          waitingPage: undefined,
          waitingMode: undefined
        });
        this.trimInProgress = false;
      },
      (msg) => {
        if (!msg || !msg.data.msg)
          return;

        this.setState((prevState) => {
          prevState.log.push(msg.data.msg);

          return prevState;
        });
      },
    );
    // Send Cut video event
    this.pushDLobject('Cut video');
  };

  /*
   * Is triggered each time a new file is inserted in our App
   * It takes the file, and stores it in state for further actions
   */
  onFileChange = (e) => {
    const file = e.target.files[0];

    this.setState({
      file: file,
      waitingPage: true,
      waitingMode: 'upload'
    });
  };

  /*
   * set start trim time (input from Timeline)
   */ 
  setStartTrim = (timeInput) => { 
    // Pass to local input state 
    this.setState({startTrimFromTimeline: timeInput});

    // Check if input is bigger than the duration of the video  
    // if it is, pass nothing to startTrim 
    if (timeInput > this.state.duration){
      this.setState({startTrim: undefined});
      return;
    }

    // Check if start trim time is bigger or equal than CURRENT input's end trim time (if there is one yet)
    // if it is, pass nothing to startTrim
    if (this.state.endTrimFromTimeline) {
      if (timeInput >= this.state.endTrimFromTimeline){
        this.setState({startTrim: undefined});
        return;
      } 
    }

    // everything's ok, pass the time to startTrim
    this.setState({startTrim: timeInput});

    // when dragging the desired start time in the timeline, update video's start time at the same time
    const videoplayer = document.getElementById('videoPlayer'); 
    videoplayer.currentTime = timeInput;
    
    // if there's end trim time, pass it too
    if (this.state.endTrimFromTimeline) {
      this.setState({endTrim: this.state.endTrimFromTimeline});
    }
  }


  /* 
   * set end trim time (input from Cutbox)
   */
  setEndTrim = (timeInput) => {
    // Pass to local input state 
    this.setState({endTrimFromTimeline: timeInput});

    // Check if input is bigger than the duration of the video  
    // if it is, pass nothing to endTrim
    if (timeInput > this.state.duration){
      this.setState({endTrim: undefined});
      return;
    }

    // Check if end trim is smaller or equal than CURRENT input's start trim time (if there is one yet)
    // if it is, pass nothing to endTrim
    if (this.state.startTrimFromTimeline) {
      if (timeInput <= this.state.startTrimFromTimeline) {
        this.setState({endTrim: undefined});
        return;
      }
    }

    // everything's ok, pass the time to endTrim
    this.setState({endTrim: timeInput});

    // if there's start trim time, pass it too
    if (this.state.startTrimFromTimeline) {
      this.setState({startTrim: this.state.startTrimFromTimeline});
    }
  }

  /*
   * Get Player component
   */
  getPlayer = () => {
    return (
      <div className={styles.player}>
        <Player
          playable={returnSource(this.state.file)}
          setVideoCurrentTime={this.setVideoCurrentTime}
          startTrim={this.state.startTrim}
          endTrim={this.state.endTrim}
        />
      </div>
    );
  }

  /*
   * Get Timeline component
   */
  getTimeline = () => {
    return (
      <div className={styles.timeline}>
        <Timeline
          file={this.state.file}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          startTrim={this.state.startTrim}
          endTrim={this.state.endTrim}
          setStartTrim={this.setStartTrim}
          setEndTrim={this.setEndTrim}
        />
      </div>
    );
  }

  /*
   * Get TimelineFooter component
   */
  getTimelineFooter = () => {
    return (
      <div className={styles.timelineFooter}>
        <TimelineFooter
          startTrim={this.state.startTrim}
          endTrim={this.state.endTrim}
        />
      </div>
    );
  }

  /*
   * Get CutButton component
   */
  getCutbutton = () => {
    return (
      <div className={styles.cutbutton}>
        <Cutbutton
          updateTrimmedFile={this.updateTrimmedFile}
          startTrim={this.state.startTrim}
          endTrim={this.state.endTrim}
          editingMode={this.state.editingMode}
        />
      </div>
    );
  }

  /*
   * Get Header component
   * If you don't have the url then return nothing
   */
  getHeader = () => {
    if (!config.MAIN_MENU_ACCUSONUS_LOGO.url)
      return;

    return (
      <Header />
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Head>
          <link rel='canonical' href='https://video-cutter.accusonus.com/' />
          <meta name='description' content={config.METADATA_DESCRIPTION} /> 
          <title>Video Cutter</title>
        </Head>      
        {(!this.state.file || this.state.fileTrimmed) &&
          <>
            {this.getHeader()}
          </>
        }
        <Banner
          getBackHome={this.getBackHome}
        />
        {(this.state.file && this.state.duration && !this.state.fileTrimmed && !this.state.waitingPage) &&
          <div className={this.getCurrentLayout()}>
            <div className={styles.editMode}>
              {(this.props.isDesktopSized) &&
                <>
                  <div className={styles.playerContainer}>
                    {this.getPlayer()}
                  </div>
                  <div className={styles.timelineContainer}>
                    {this.getTimeline()}
                    <div className={styles.twoColumnContainer}>
                      {this.getTimelineFooter()}
                      {this.getCutbutton()}
                    </div>
                  </div>
                </>
              }
              {(this.props.isMobileSized || this.props.isTabletSized) &&
                <>
                  {this.getPlayer()}
                  {this.getTimeline()}
                  {this.getTimelineFooter()}
                  {this.getCutbutton()}
                </>
              }
            </div>
          </div>
        }
        {!this.state.file &&
          <Visit onFileChange={this.onFileChange} />
        }
        {this.state.fileTrimmed && 
          <Result 
            playable={this.state.fileTrimmed}
            getBackToEdit={this.getBackToEdit}  
            fileName={this.state.fileTrimmedName}
            fileSize={this.state.fileTrimmedSize}
            pushDLobject={this.pushDLobject}
          />
        }
        {this.state.waitingPage &&
          <WaitingPage
            mode={this.state.waitingMode} 
          />}
      </div>
    ); 
  }
}

App.propTypes = {
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(App);
