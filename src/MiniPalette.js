import React from 'react';

import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal'
  }
}

let MiniPalette = (props) => {
  const {classes} = props;
  console.log(classes)
  return (
    <div className={classes.main}>
      <h1>mini palete</h1>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);