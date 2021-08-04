/* 
 * Visit component: this component includes the visit mode of our App (static page)
*/
import React, { Component } from 'react';
import { Footer } from '../footer';
import styles from './Visit.module.css';
import PropTypes from 'prop-types';
import config from '../../utils/config/config.js';

import withWindowDimensions from '../../hoc/withWindowDimensions.js';

class Visit extends Component {

  /* 
   * We get the desired video file via this component's input
   * and with setChange we pass it to App through the onFileChange function
   */
  setChange = (e) => {
    this.props.onFileChange(e);
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
   * Get second slice of the page (Instructions)
   */
  getInstructions = () => {
    return (
      <div className={styles.instructions}>
        <div className={styles.instrTitle}>How to use this free video cutter</div>
        <div className={styles.threeColumnContainer}>
          <div className={styles.step}>
            <div className={styles.stepTitle}>1. Upload your video</div>
            <div className={styles.stepDescription}>
              Open a video file from your device.
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepTitle}>2. Choose Start and End times</div>
            <div className={styles.stepDescription}>
              Use the sliders to select the length you want. Finely tune the cutting times with your arrow keys.
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepTitle}>3. Download and Share!</div>
            <div className={styles.stepDescription}>
              Hit ‘Done’ to get your final, trimmed video! This online video cutter is completely free to use. No strings attached. 
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Get third slice of the page (Infoboxes)
   */
  getInfoboxes = () => {
    return(
      <div className={styles.infoBoxes}>
        <div className={styles.threeColumnContainer}>
          <div className={styles.box}>
            <div className={styles.imageContainerBox}>
              <img src={'/img/scissors.svg'} alt={'A Fast & Free Video Cutter'} />
            </div>
            <div className={styles.title}>
              A Fast & Free Video Cutter
            </div>
            <div className={styles.description}>
              Cut and trim by adjusting two simple markers. One for the desired beginning, one for the desired end. 
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.imageContainerBox}>
              <img src={'/img/play.svg'} alt={'Cut & Trim Any Video Format'} />
            </div>
            <div className={styles.title}>
              Cut & Trim Any Video Format
            </div>
            <div className={styles.description}>
              AVI, MP4, VOB, MPG, MOV and many more - this online video trimmer can handle whatever file you give it. 
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.imageContainerBox}>
              <img src={'/img/planet.svg'} alt={'A Fully Online Video Cutter'} />
            </div>
            <div className={styles.title}>
              A Fully Online Video Cutter
            </div>
            <div className={styles.description}>
              No program download, no software installation. Just fast and efficient online video trimming, right here in your browser. 
            </div>
          </div>
        </div>
        <div className={styles.twoColumnContainer}>
          <div className={styles.box}>
            <div className={styles.imageContainerBox}>
              <img src={'/img/computer.svg'} alt={'Simple, Easy-to-Use Controls'} />
            </div>
            <div className={styles.title}>
              Simple, Easy-to-Use Controls
            </div>
            <div className={styles.description}>
              No video editing skill needed. Just upload, adjust, then receive. All free, all online. 
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.imageContainerBox}>
              <img src={'/img/badge.svg'} alt={'Safe & Secure'} />
            </div>
            <div className={styles.title}>
              Safe & Secure <br/> <br/>
            </div>
            <div className={styles.description}>
              This free video cutter is fully secure. Your files are only accessible to you, and you alone.  
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Get fourth slice of the page (Textbox)
   */
  getTextbox = () => {
    return (
      <div className={styles.textBox}>
        <div className={styles.textBoxtitle}>Online Video Cutter</div>
        <div className={styles.text}>
          <p>Cutting and trimming videos is the simplest form of editing. Yet, it can still be annoying. Downloading software, fine-tuning lengths, exporting files... There’s an easier way.</p>
          <p>This free video cutter by accusonus acts as your personal, fully-online trimming tool. No downloads, no hidden costs, and - most importantly - no wasted time!</p>
          <p>The online video trimmer works with whatever video file you give it. MP4, AVI, MOV - and many more. Upload the file you want to edit through Dropbox, Google Drive, or your device itself.</p>
          <p>Cutting videos is an easy way to improve the quality of your social media content. Create highlights, tune your videos, and boost your production value. All online, all in your browser.</p>
          <p>We recommend this free online video cutter for video posts on TikTok, Instagram, Snapchat, YouTube, Facebook, and all other content platforms.</p>
        </div>
        <div className={styles.textBoxtitle}>So, go get creating!</div>
      </div>
    );
  }

  /*
   * Get fifth slice of the page (Products)
   */
  getProducts = () => {
    return (
      <div className={styles.products}>
        <div className={styles.twoColumnContainer}>
          <div className={styles.product}>
            <div className={styles.imageProduct}>
              <a href="https://accusonus.com/products/audio-repair/era-bundle-standard">
                <img src={'/img/ERAbundle.jpg'} alt={'ERA bundle'} />
              </a>
            </div> 
            <div className={styles.caption}>Repair Video Audio on Mac or Windows</div>
          </div>

          <div className={styles.product}>
            <div className={styles.imageProduct}>
              <a href="https://accusonus.com/products/mauvio">
                <img src={'/img/Mauvio.jpg'} alt={'Mauvio'} />
              </a>
            </div> 
            <div className={styles.caption}>Repair Video Audio on iOS</div>
          </div>
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

  
  render() {
    return (
      <div className={this.getCurrentLayout()}>
        <div className={styles.containerIntro}>
          <div className={styles.titleContainer}>
            <h1 className={styles.bigtitle}>Free Online Video Cutter</h1>
            <h2 className={styles.middletitle}>Trim video of any format, right here in your browser</h2>
          </div>
          
          <div className={styles.inputStyle}>  
            <label id="uploader-label" htmlFor="uploader">
              <input
                type="file"
                accept="video/*"
                onChange={this.setChange}
                id="uploader"
              />
              <div className={styles.labelText}>
                Open file 
              </div>
            </label>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.clapboardContainer}>
            <div className={styles.clapboard}>
              <img src='/img/clapboard.svg' alt={'Online Video Cutter'} />
            </div> 
          </div>
        </div>
        
        <div className={styles.bgPaleWhite}>
          {this.getInstructions()}
        </div>

        <div className={styles.bgWhite}>
          {this.getInfoboxes()}
        </div>

        <div className={styles.bgPaleWhite}>
          {this.getTextbox()}
        </div>

        <div className={styles.bgWhite}>
          {this.getProducts()}
        </div>

        {this.getFooter()}
      </div> 
    );
  }
}

Visit.propTypes = {
  onFileChange: PropTypes.func,
  // Provided by withWindowDimensions() HOC
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
  isTabletSized: PropTypes.bool,
  isDesktopSized: PropTypes.bool,
};

export default withWindowDimensions(Visit);
