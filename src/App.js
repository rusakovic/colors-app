import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import { palette } from '@material-ui/system';

class App extends Component {

  findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id
    })
  }

  render() {
    return (
      <Switch>
        <Route 
          exact 
          path='/palette/new' 
          render={() => <NewPaletteForm />} 
        />
        <Route 
          exact path='/' 
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route 
          exact 
          path='/palette/:id' 
          //take the value id from the link and insert into Pallete component as props 
          render={(routeProps) => (
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )} 
            />
          )} 
        />
        <Route 
          path='/palette/:paletteId/:colorId' 
          render={(routeProps) => (
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )} 
            />
          )}  
        />
                
      </Switch>

    );
  }
}

export default App;
