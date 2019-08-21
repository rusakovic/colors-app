import React from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

 function PaletteFormNav(props) {
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const { open, classes, handleSubmit, handleDrawerOpen, palettes } = props;

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
      <div>
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
              Persistent drawer
            </Typography>

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
              <Link to='/'>
                <Button variant='contained' color='secondary'>Go Back</Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  
}
export default PaletteFormNav;