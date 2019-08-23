import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';




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
              className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} 
            />
            {/* div for displaying text Copied and # of color above scaled DIV */}
            <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
              <h4>copied!</h4>
              <p className={classes.copyText}>
                {background}
              </p>
            </div>
            <div>
              <div className={classes.boxContent}>
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