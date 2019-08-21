import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaletteFormNav from './PaletteFormNav';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const { handleSubmit, palettes } = props;

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

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please, enter a name for your new beautiful palette. Make sure it's unique.
          </DialogContentText>
          {/* New Palette Validator input */}

            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='newPaletteName'
              fullWidth
              margin='normal'
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

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button
            variant='contained'
            color='primary'
            type='submit'
          >
            Save Palette
          </Button>
        </DialogActions>
        </ValidatorForm>

      </Dialog>
  );
}
export default PaletteMetaForm;