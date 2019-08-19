import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';


import './ColorBox.css';

const styles = {
  ColorBox: {
    width: '20%',
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover button': {
      opacity: '1'
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'white'
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'white',
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: "0",
  }
}

 class ColorBox extends Component {
   constructor(props) {
     super(props);
     this.state = {copied: false };

     this.changeCopyState = this.changeCopyState.bind(this);
   }

   changeCopyState() {
      this.setState({copied: true}, () => {
        setTimeout(() =>  this.setState({ copied: false }), 1500);
      })
   }

    render() {
      const { name, background, moreUrl, showingFullPalette, classes } = this.props;
      const { copied } = this.state;

      return (
        <CopyToClipboard
          text={background}
          onCopy={this.changeCopyState}
        >
          <div style={{ background: background }} className={classes.ColorBox}>
            {/* we should use the other div to avoid scaling of everything: text, buttons */}
            <div 
              style={{ background: background }} 
              className={`copy-overlay ${copied && "show"}`} 
            />
            {/* div for displaying text Copied and # of color above scaled DIV */}
            <div className={`copy-msg ${copied && "show"}`}>
              <h4>copied!</h4>
              <p className={classes.copyText}>
                {background}
              </p>
            </div>
            <div className="copy-container">
              <div className="box-content">
                <span className={classes.copyText}>{name}</span>
              </div>
              <button className={classes.copyButton}>
                Copy
              </button>
            </div>
            {/* show the link only into the main palette component, but in shades color component we should hide it */}
            {showingFullPalette && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore}>MORE</span>
              </Link>

            )}

          </div>
        </CopyToClipboard>
        );
    }
}		  
export default withStyles(styles)(ColorBox);