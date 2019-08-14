import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>palette lsit</h1>}/>
        <Route 
          exact 
          path='/palette/:id' 
          render={() => <h1>individual palette</h1>} 
        />
      </Switch>
      // <div>
       // <Palette palette={generatePalette(seedColors[1])}/>
      // </div>
    );
  }
}

export default App;
