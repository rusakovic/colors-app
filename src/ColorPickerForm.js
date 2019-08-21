import React from 'react'

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

 function ColorPickerForm(props) {
    const { paletteIsFull, addNewColor, colors } = props;

    const [currentColor, setColor] = React.useState('teal');
    const [newColorName, setNewColorName] = React.useState('');

    React.useEffect(() => {
      // validation for color Name
      ValidatorForm.addValidationRule('isColorNameUnique', value => {
        return colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
      }); 
      // validation for color itself
        ValidatorForm.addValidationRule('isColorUnique', value => {
          return colors.every(
            ({ color }) => color !== currentColor
          )
        }); 
  
  
    })


    function updateCurrentColor(newColor) {
      setColor(newColor.hex);
    }

    // set new Color Name to state
    function handleChangeColorName(evt) {
      setNewColorName(evt.target.value);
    }

    function handleSubmit() {
      const newColor = {
        color: currentColor,
        name: newColorName,
      };
      addNewColor(newColor);
      setNewColorName('');
    }

    return (
      <div>
      <ChromePicker 
          color={currentColor} 
          onChangeComplete={updateCurrentColor}
        />

        {/* New Color Validator input */}
        <ValidatorForm onSubmit={handleSubmit} >
          <TextValidator 
            value={newColorName} 
            name='newColorName'
            onChange={handleChangeColorName}
            validators={[
              'required', 
              'isColorNameUnique', 
              'isColorUnique'
            ]}
            errorMessages={[
              'Enter a color name', 
              'Colorname should be unique', 
              'Color already used'
            ]}
          />
        <Button 
          variant='contained' 
          color='primary' 
          type='submit'
          style={{
            backgroundColor: paletteIsFull 
              ? 'grey' 
              : currentColor
          }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
        </ValidatorForm>  
      </div>
    )
}
export default ColorPickerForm;