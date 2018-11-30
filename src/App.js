import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import dragons from './dragons';
import Dragon from './Dragon';

// our reference to the root of the database
let dbRef= firebase.database().ref();


class App extends Component {
  constructor() {
    super();
    this.state = {
      dragons: dragons,
      dragonCount: 0,
      wagonCount: 0,
      bilboCount: 0,
      score: 0
    }
  }

  // increment firebase number for whichever element was clicked
  handleClick = (e) => {
    // which item was clicked? which one should we update? the id of the item is passed in e (event)
    const id = e.target.id;
    console.log(id);
    
    // choose the corrrect firebase node to update
    const updateFBCount = firebase.database().ref(`/${id}Count`);

    // get the current value of the corresponding state item so we can add one to it
    // TEMPORARY - can you just put a variable in this.state.{thing} ?? stack overflow says no lol
    let currentState;

    if (id === "dragon") {
      currentState = this.state.dragonCount;
    } else if (id === "wagon") {
      currentState = this.state.wagonCount;
    } else {
      currentState = this.state.bilboCount;
    }

    currentState++;
  
    console.log("this is currentstate",currentState);

    // let the counts in firebase be the current state plus one, then when those changes mount we can upsate the current state
    updateFBCount.set(currentState);
    setScore(id);
  }

  // setScore = (id) = {
  //   console.log(id);
    
  // }

  // attach event listener to firebase, set the state to what is in firebase
  componentDidMount() {
    dbRef.on("value", (snapshot) => {
      this.setState({
        dragonCount: snapshot.val().dragonCount,
        wagonCount: snapshot.val().wagonCount,
        bilboCount: snapshot.val().bilboCount,
        score: snapshot.val().score
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Bilbo Baggins' Dragon Wagon Drag'n'Drop</h1>

          <div className="container">
            {
              this.state.dragons.map((dragon, i) => {
                return (
                  <Dragon onClick={this.handleClick} key={i} character={dragon.character} title={dragon.title} imgPath={dragon.imgPath} />
                )
              })
            }

            <div className="dropzones">
              <span onClick={this.handleClick} className="bilbo character" role="img" aria-labelledby="hobbit" id="bilbo">👱🏻‍</span>
              <span onClick={this.handleClick} className="wagon character" role="img" aria-labelledby="wagon" id="wagon">🛷</span>
            </div>
          </div>

          <section>
            <p>Your score is: {this.state.score}</p>
          </section>
          
      </div>
    );
  }
}

export default App;
