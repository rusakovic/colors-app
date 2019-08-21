import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DrarggableColorList';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';


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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

NewPaletteForm.defaultProps = {
  maxColors: 20
}

function NewPaletteForm(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setColor] = React.useState('teal');
  const [colors, setNewColor] = React.useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = React.useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');

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

    //Validator for Palette Name
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    });

  })

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function updateCurrentColor(newColor) {
    setColor(newColor.hex);
  }

  function addNewColor() {
    const newColor = {
      color: currentColor,
      name: newColorName,
    }
    setNewColor(oldColors => [...oldColors, newColor]);
    setNewColorName('');
  }

  // set new Color Name to state
  function handleChangeColorName(evt) {
    setNewColorName(evt.target.value);
  }



  // save colors to new palette and redirect to the main page
  function handleSubmit(newPaletteName) {
    // id = the name, but with dashes instead of spaces
    const newPalette = {
      paletteName: newPaletteName, 
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    }
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
  let onSortEnd = ({oldIndex, newIndex}) => {
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
    const allColors = props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
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
        classes={classes} 
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
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button
           variant='contained' 
           color='primary'
           onClick={addRandomColor}
           disabled={paletteIsFull}

          >
            Random Color
          </Button>
          <Button 
            variant='contained' 
            color='secondary'
            onClick={clearColors}
          >
            Clear Palette
          </Button>
        </div>
        <ChromePicker 
          color={currentColor} 
          onChangeComplete={updateCurrentColor}
        />

        {/* New Color Validator input */}
        <ValidatorForm onSubmit={addNewColor} >
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
          />
      </main>
    </div>
  );
}

export default NewPaletteForm;