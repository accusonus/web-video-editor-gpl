import React, { Component } from 'react';
import styles from './Result.module.css';
import config from '../../utils/config/config.js';

import withWindowDimensions from '../../hoc/withWindowDimensions.js';
import PropTypes from 'prop-types';

import { Player } from '../editMode/player';
import { Editbutton } from './editbutton';
import { Download } from './downloadbutton';
import { Footer } from '../footer';

class Result extends Component {

  /*
   * Get current layout, depending on window dimensions
   */
  getCurrentLayout = () => {
    if (this.props.isMobileSized || this.props.isTabletSized) 
      return styles.mobileLayout;
    return styles.desktopLayout;
  }

  /*
   * Get Player component
   */
  getPlayer = () => {
    return (
      <div className={styles.player}>
        <Player playable={this.props.playable} />
      </div>
    );
  }

  /*
   * Get Buttons component
   */
  getButtons = () => {
    return (
      <div className={styles.buttonContainer}>
        <div className={styles.buttonBox}>
          <Editbutton getBackToEdit={this.props.getBackToEdit} />
          <Download 
            result={this.props.playable} 
            fileName={this.props.fileName}
            fileSize={this.props.fileSize}
            pushDLobject={this.props.pushDLobject}
          />
        </div>
        <div className={styles.sizeAndNameBox}>  
          <span className={styles.fileName}>{this.props.fileName}</span>
          &nbsp;
          <span className={styles.fileSize}>({this.props.fileSize})</span>
        </div>
      </div>
    );
  }

  /*
   * Get Footer component
   * If not all env variables are provided, return nothing
   */
  getFooter = () => {
    if (!config.PATH.terms || !config.PATH.patents || !config.PATH.policy)
      return;

    return (
      <div className={styles.footer}>
        <Footer />
      </div>
    );
  }

  /*
   * By clicking the Edit result button, trigger getBackToEdit function in order to go to the previous page
   */ 
  render(){
    return (
      <div className={this.getCurrentLayout()}>
        <div className={styles.resultMode}>
          <div className={styles.columnContainer}>
            {this.getPlayer()}
            {this.getButtons()}
          </div>
        </div>
        {this.getFooter()}
      </div>
    );
  }
}

Result.propTypes = {
  getBackToEdit: PropTypes.func,
  playable: PropTypes.string,
  fileName: PropTypes.string,
  fileSize: PropTypes.string,
  pushDLobject: PropTypes.func,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(Result);
