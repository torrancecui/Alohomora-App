// import logo from './logo.svg';
// import hpLogo from './hpLogo.svg';
import houses_img from './houses.png';
import React, {Component} from 'react';
import './App.css';

const houses = ["hufflepuff", "gryffindor", "slytherin", "ravenclaw"];

function App() {
  //random number between 0-3
  let rand_num = Math.floor( (Math.random() * 4));
  return (
    <div className="App">
      <header className="App-header">
        <p className = "App-title">
          welcome to alohomora.
        </p>
        <div className = "Banner">
          {/* <div className = "leftBanner"> 
            <img src={hpLogo} className="App-logo" alt="hpLogo" />
          </div> */}
          <div className = "centerBanner"> 
            <img src = {houses_img} className= "Houses-img" alt = "houses" />
          </div>
          {/* <div className = "rightBanner"> 
            <img src={hpLogo} className="App-logo" alt="hpLogo" />
          </div> */}
        </div>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          your house is ... {houses[rand_num]}
        </a>
        
        <div className = "Credits">
          <p>developed by torrance</p>
          <p>hp credit to ms.rowling</p>
        </div>

      </header>
    </div>
  );
}

export default App;
