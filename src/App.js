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

  drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  }

  bilboDrop = (e) => {
    e.preventDefault();
    var drgn = e.dataTransfer.setData("text");
    e.target.appendChild(document.getElementById(drgn));
  }

  wagonDrop = (e) => {
    e.preventDefault();
    var drgn = e.dataTransfer.setData("text");
    e.target.appendChild(document.getElementById(drgn));
  }

  buttonClick = () => {
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

  // increment firebase number for whichever element was clicked
  handleClick = (e) => {    
    // which item was clicked? which one should we update? the id of the item is passed in e (event)
    const id = e.target.id;    

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
  
    // let the counts in firebase be the current state plus one, then when those changes mount we can update the current state
    updateFBCount.set(currentState);

    // only update score on click of wagon and bilbo TEMPORARY?
    if (id === "wagon" || id === "bilbo") {
      this.setScore(id);
    }
  }

  // calculate the new score
  setScore = (id) => {
    const wagonFbScore = firebase.database().ref(`/wagonCount`);
    const bilboFbScore = firebase.database().ref(`/bilboCount`);

    const calcScore = (50 * wagonFbScore) - (10 * bilboFbScore);

    const fbScore = firebase.database().ref("/score");
    fbScore.set(calcScore);
  }

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

        <form action="">
          <label htmlFor="userName">Please enter your name:</label>
          <input type="text" name="userName" id="userName" placeholder="Frodo111"/>
          <button onClick={this.formSubmit}>Set username</button>
        </form>

        <div className="container">
          {
            this.state.dragons.map((dragon, i) => {
              return (
                <Dragon onClick={this.handleClick} key={i} character={dragon.character} title={dragon.title} imgPath={dragon.imgPath} />
              )
            })
          }

          <div className="dropzones">
            <span onDragOver={this.allowDrop} onDrop={this.bilboDrop} onClick={this.handleClick} className="bilbo character" role="img" aria-labelledby="bilbo" id="bilbo">👱🏻‍</span>
            <span onDragOver={this.allowDrop} onDrop={this.wagonDrop} onClick={this.handleClick} className="wagon character" role="img" aria-labelledby="wagon" id="wagon">🛷</span>
          </div>
        </div>

        <section>
          <p>Your score is: {this.state.score}</p>
          <button onClick={this.buttonClick}>Play again?</button>
        </section>
        
      </div>
    );
  }
}

export default App;
