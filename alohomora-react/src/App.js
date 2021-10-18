import React, { Component } from "react";
import queryString from "query-string";
import "./App.css";

import loginLogo from "./images/login_logo.svg";
import gryffindor from "./images/lion.png";
import slytherin from "./images/snake.png";
import hufflepuff from "./images/badger.png";
import ravenclaw from "./images/raven.png";

//global for later dev
let accessToken;
let username = "";

//return app title
function Title(){
  return(
    <div class = "Title">
        <p>welcome to alohomora ϟ</p>
    </div>
  );
}

//return app credits
function Credits(){
  return(
    <div class = "Credits">
      <p>developed by torrance</p>
      <p>harry potter credits to ms.rowling</p>
    </div>
  );
}

//constructs login page if user is not signed in
function LoginPage(){
  return(
    <div class = "Login-page">
      <div class = "Login-logo">
        <img src = {loginLogo} class = "Login-img" alt = "login-img" />
      </div>
      <div class  = "Login-button">
        <button 
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://alohomora-app-backend.herokuapp.com/login";
            }}
          >
            sign in with spotify
          </button>
      </div>
    </div>
  )
}

//calculates and returns house decision and logo
class HouseDecision extends Component{
  render(){
    //current random algo using hash of username
    const houses = ["hufflepuff", "gryffindor", "slytherin", "ravenclaw"];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash += username.charCodeAt(i);
    }
    let hashNum = hash % 4;
    let house = houses[hashNum];

    return (
      <div class = "Decision">
        <div 
          class = "Banner"
          style={
            { 
              background: house === 'slytherin' ? "#caffbf" : 
                          house === 'ravenclaw' ? "#a0c4ff" : 
                          house === 'gryffindor' ? "#ffadad" : 
                          house === 'hufflepuff' ? "#fdffb6" : 
                          "" 
            }
          }
        >
          {house === 'gryffindor' && <img src = {gryffindor} class= "Houses-img" alt = "gryffindor" />}
          {house === 'hufflepuff' && <img src = {hufflepuff} class= "Houses-img" alt = "hufflepuff" />}
          {house === 'slytherin' && <img src = {slytherin} class= "Houses-img" alt = "slytherin" />}
          {house === 'ravenclaw' && <img src = {ravenclaw} class= "Houses-img" alt = "ravenclaw" />}
        </div>
        <p>
          your house is ... {house}
        </p>
      </div>
    )
  }
}

//MAIN APP
class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    accessToken = parsed.access_token;
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          user: {
            name: data.display_name,
          },
        })
      );
  }
  render() {
    return (
      <div class="App">
        <Title></Title>
        {this.state.user ? (
          //content if user is signed in already
          <div class="Content">
            <p>
              hi {username = this.state.user.name}
            </p>
            <HouseDecision />
          </div>
        ) : (
          //content if user is NOT signed in
          <LoginPage></LoginPage>
        )}
        <Credits></Credits>
      </div>
    );
  }
}

export default App;
