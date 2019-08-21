import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id
    })
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] })
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => (
            <NewPaletteForm

              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact path='/'
          render={(routeProps) => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
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
