import React, { Component } from 'react';
import styles from './Download.module.css';
import saveAs from 'file-saver';
import PropTypes from 'prop-types';

class Download extends Component {
  /*
   * By clicking the Download button, the trimmed file is downloaded
   */ 
  downloadResult = () => {
    saveAs(this.props.result, this.props.fileName);

    // Send Download Cutted video event
    this.props.pushDLobject('Download Cutted video');
  }

  render() {
    return(
      <button className={styles.downloadButton} onClick={this.downloadResult}>Download</button> 
    );
  }
}

Download.propTypes = {
  result: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  pushDLobject: PropTypes.func,
};

export default Download;
