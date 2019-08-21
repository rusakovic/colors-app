import React from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {

  }
}))

function PaletteFormNav(props) {
  const classes = useStyles();
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const { open, handleSubmit, handleDrawerOpen, palettes } = props;

  React.useEffect(() => {

    //Validator for Palette Name
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    });

  })

  // set new Palette Name to state
  function handleChangePaletteName(evt) {
    setNewPaletteName(evt.target.value)
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
            </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          {/* New Palette Validator input */}
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='newPaletteName'
              onChange={handleChangePaletteName}
              validators={[
                'required',
                'isPaletteNameUnique'
              ]}
              errorMessages={[
                'Enter Palette Name',
                'Palette name already used'
              ]}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Save Palette
              </Button>
          </ValidatorForm>
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
            >
              Go Back
                </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  )

}
export default PaletteFormNav;
