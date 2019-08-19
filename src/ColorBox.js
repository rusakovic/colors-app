import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';

import './ColorBox.css';

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
      const { name, background, paletteId, id, moreUrl, showLink } = this.props;
      const { copied } = this.state;

      // we should use different font color for light and dark palettes
      const isDarkColor = chroma(background).luminance() <= 0.4;
      const isLightColor = chroma(background).luminance() >= 0.5;

      return (
        <CopyToClipboard
          text={background}
          onCopy={this.changeCopyState}
        >
          <div style={{ background: background }} className='ColorBox'>
            {/* we should use the other div to avoid scaling of everything: text, buttons */}
            <div 
              style={{ background: background }} 
              className={`copy-overlay ${copied && "show"}`} 
            />
            {/* div for displaying text Copied and # of color above scaled DIV */}
            <div className={`copy-msg ${copied && "show"}`}>
              <h4>copied!</h4>
              <p className={isLightColor && 'dark-text'}>
                {background}
              </p>
            </div>
            <div className="copy-container">
              <div className="box-content">
                <span className={isDarkColor && "light-text"}>{name}</span>
              </div>
              <button className={`copy-button ${isLightColor && 'dark-text'}`}>
                Copy
              </button>
            </div>
            {/* show the link only into the main palette component, but in shades color component we should hide it */}
            {showLink && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${isLightColor && 'dark-text'}`}>MORE</span>
              </Link>

            )}

          </div>
        </CopyToClipboard>
        );
    }
}		  
export default ColorBox;