import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Editbutton extends Component {

  /*
   * By clicking the Edit result button, trigger getBackToEdit function of Result page
   */ 

  render() {
    return(
      <button onClick={() => this.props.getBackToEdit()}>Edit result</button> 
    );
  }
}

Editbutton.propTypes = {
  getBackToEdit: PropTypes.func
};

export default Editbutton;
