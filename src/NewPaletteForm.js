import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DrarggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors'



NewPaletteForm.defaultProps = {
  maxColors: 20
}

function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setNewColor] = React.useState(seedColors[0].colors);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function addNewColor(newColor) {

    setNewColor(oldColors => [...oldColors, newColor]);
  }

  // save colors to new palette and redirect to the main page
  function handleSubmit(newPalette) {
    // id = the name, but with dashes instead of spaces
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;

    props.savePalette(newPalette);
    //redirect to the main page
    props.history.push('/')
  }

  //remove color from NewPalete using trash icon
  function removeColor(colorName) {
    setNewColor(
      colors.filter(color => color.name !== colorName)
    )
  }

  // function for sorting ColorBoxes
  let onSortEnd = ({ oldIndex, newIndex }) => {
    setNewColor(
      arrayMove(colors, oldIndex, newIndex)
    )
  };

  // clear colors from new pallete function
  function clearColors() {
    setNewColor([])
  }

  // add random color to palette from all colors in all existed palettes
  function addRandomColor() {
    // pick random color from existing palettes
    const allColors = props.seedColors.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while(isDuplicateColor) {
       rand = Math.floor(Math.random() * allColors.length);
       randomColor = allColors[rand];;
        isDuplicateColor = colors.some(color => color.name === randomColor.name)
    }
    setNewColor(oldColors => [...oldColors, randomColor]);
  }

  // REFACTORING PROPS
  const { maxColors, palettes } = props;
  // Check if the palette colors more than maxColors
  const paletteIsFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      {/* NewPallette navbar as separate component */}
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      {/* inner components */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div className={classes.container}>
          <Typography 
            variant='h4'
            gutterBottom
          >
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
          </div>
          {/* Separated color picker from */}
          <ColorPickerForm 
            paletteIsFull={paletteIsFull} 
            addNewColor={addNewColor} 
            colors={colors} 
          />
        </div>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
          distance={10}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;