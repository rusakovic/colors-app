import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm(props) {
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const { handleSubmit, palettes, hideForm } = props;
  const [open, setOpen] = React.useState('form');

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

  function showEmojiPicker() {
    setOpen('emoji')
  }

  function savePalette(emoji) {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    }
    handleSubmit(newPalette);
    setOpen('')

  }

  return (
    <div>
      <Dialog open={open === 'emoji'} onClose={hideForm}  >
        <DialogTitle id="emoji-dialog-title">Pick a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title='Pick a Palette Emoji' />
      </Dialog>
      <Dialog
        open={open === 'form'}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
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
            <Button onClick={hideForm} color="primary">
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
    </div>
  );
}
export default PaletteMetaForm;