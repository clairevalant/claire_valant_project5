import React, { Component } from 'react';
import './App.css';
import dragons from './dragons';
import Dragon from './Dragon';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dragons: dragons
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Bilbo Baggins' Dragon Wagon Drag'n'Drop</h1>

          <div className="container draggableSource">
            {
              this.state.dragons.map((dragon, i) => {
                return (
                 <Dragon id={i} character={dragon.character} title={dragon.title} imgPath={dragon.imgPath} />
                )
              })
            }
          </div>

          {/* <div className="wagon droppable">
            <span className="hobbit" role="img" aria-labelledby="hobbit" id="uniqueDropZone">👱🏻‍</span>
            <span className="wagon" role="img" aria-labelledby="wagon" id="uniqueDropZone">🛷</span>
          </div> */}
          
      </div>
    );
  }
}

export default App;
