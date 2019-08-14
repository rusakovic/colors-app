import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Slider from 'rc-slider';


import 'rc-slider/assets/index.css';
import './Navbar.css';


 class Navbar extends Component {
   constructor(props) {
     super(props);
     this.state = {
       format: 'hex',
       open: true
     }
     this.handleFormatChange = this.handleFormatChange.bind(this);
     this.closeSnackbar = this.closeSnackbar.bind(this);
   }

   handleFormatChange(e) {
     this.setState({ format: e.target.value, open: true });
     this.props.handleChange(e.target.value);
   }

   // function for closing Snackbar by user
   closeSnackbar() {
     this.setState({ open: false })
   }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
    return (
      <header className='Navbar'>
        <div className="logo">
          <Link to='/'>reactcolorpicker</Link>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            {/* slider for changing the range of colors */}
            <Slider 
              defaultValue={level} 
              min={100} 
              max={900} 
              step={100} 
              onAfterChange={changeLevel}
            />
          </div>

        </div>
        {/* dropdown color selection  */}
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>Hex - #ffffff</MenuItem>
            <MenuItem value='rgb'>Rgb - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>Rgb - rgb(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        {/* pop-up small window when the user change the color type */}
        <Snackbar 
          anchorOrigin={{vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id='message-id'>Format Changed to {format.toUpperCase()}</span>}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton 
              onClick={this.closeSnackbar} 
              color='inherit' 
              key='close' 
              aria-label='close'>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    )
  }
}

export default Navbar;
