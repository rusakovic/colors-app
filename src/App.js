import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
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
          exact path='/' 
          render={() => <PaletteList palettes={seedColors} />}
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
      </Switch>
      // <div>
       // <Palette palette={generatePalette(seedColors[1])}/>
      // </div>
    );
  }
}

export default App;
