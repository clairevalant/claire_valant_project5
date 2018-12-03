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
      wagonCount: 1,
      bilboCount: 0,
      score: 0
    }
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  dragStart = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  dragEnd = (e) => {
      console.log("this is the drag end ID",e.target.id);
      return true;
    }

  bilboDrop = (e) => {
    e.preventDefault();
    console.log("dropped in hobbit");

    // get the current value of the corresponding state item so we can add one to it
    let currentState = this.state.bilboCount;

    // choose the corrrect firebase node to update
    const updateFBCount = firebase.database().ref("/bilboCount");
    currentState++;

    // let the counts in firebase be the current state plus one, then when those changes mount we can update the current state
    updateFBCount.set(currentState);

    // set amount to adjust score by
    const adjustment = -10;

    // once the new counts mount from onClick, set the score
    this.setScore(adjustment);
  }

  wagonDrop = (e) => {
    e.preventDefault();
    console.log("dropped in", e.target.id);

    // get the current value of the corresponding state item so we can add one to it
    let currentState = this.state.wagonCount;

    // choose the corrrect firebase node to update
    const updateFBCount = firebase.database().ref("/wagonCount");
    currentState++;

    // let the counts in firebase be the current state plus one, then when those changes mount we can update the current state
    updateFBCount.set(currentState);

    // set amount to adjust score by
    const adjustment = 50;

    // once the new counts mount from onClick, set the score
    this.setScore(adjustment);
  }

  setScore = (adj) => {
    // get current score from state
    let score = this.state.score;

    // calculate new score
    score = score + adj;

    // update firebase
    const fbScore = firebase.database().ref("/score");
    fbScore.set(score);

    // update state from firebase
    dbRef.on("value", (snapshot) => {
      this.setState({
        score: snapshot.val().score
      })
    });

  }

  // reset on button click
  buttonClick = () => {
    // reset firebase
    const wagonFBCount = firebase.database().ref("/wagonCount");
    const bilboFBCount = firebase.database().ref("/bilboCount");
    const dragonFBCount = firebase.database().ref(`/dragonCount`);
    const scoreFBCount = firebase.database().ref(`score`);

    wagonFBCount.set(1);
    bilboFBCount.set(0);
    dragonFBCount.set(0);
    scoreFBCount.set(0);

    // reset state
    this.setState({
      dragonCount: 0,
      wagonCount: 1,
      bilboCount: 0,
      score: 0
    })
  }

  formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  }

  // attach event listener to firebase, set the state to what is in firebase
  componentDidMount() {
    dbRef.on("value", (snapshot) => {
      this.setState({
        dragonCount: snapshot.val().dragonCount,
        wagonCount: snapshot.val().wagonCount,
        bilboCount: snapshot.val().bilboCount,
        // score: snapshot.val().score
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Bilbo Baggins' Dragon Wagon Drag'n'Drop</h1>

        <form action="">
          <label htmlFor="userName">Please enter your name:</label>
          <input type="text" name="userName" id="userName" placeholder="Frodo111"/>
          <button onClick={this.formSubmit}>Set username</button>
        </form>

        <div className="container">
          {
            this.state.dragons.map((dragon, i) => {
              return (
                <Dragon key={i} onClick={this.handleClick} onDragStart={this.dragStart} onDragEnd={this.dragEnd} dragDone={this.dragDone} character={dragon.character} title={dragon.title} imgPath={dragon.imgPath} />
              )
            })
          }

          <div className="dropzones">
            <span onDragOver={this.allowDrop} onDrop={this.bilboDrop} onClick={this.handleClick} className="bilbo character" role="img" aria-labelledby="bilbo" id="bilbo">👱🏻‍</span>
            <span onDragOver={this.allowDrop} onDrop={this.wagonDrop} onClick={this.handleClick} className="wagon character" role="img" aria-labelledby="wagon" id="wagon">🛷</span>
          </div>
        </div>

        <section className="score">
          <p>Your score is: {this.state.score}</p>
          <button onClick={this.buttonClick}>Play again?</button>
        </section>
        
      </div>
    );
  }
}

export default App;
