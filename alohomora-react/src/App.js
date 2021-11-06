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
    <div className = "Title">
        <p>welcome to alohomora ϟ</p>
    </div>
  );
}

//return app credits
function Credits(){
  return(
    <div className = "Credits">
      <p>developed by torrance cui & joseph nahm</p>
      <p>harry potter credits to ms.rowling</p>
    </div>
  );
}

//constructs login page if user is not signed in
function LoginPage(){
  return(
    <div className = "Login-page">
      <div className = "Login-logo">
        <img src = {loginLogo} className = "Login-img" alt = "login-img" />
      </div>
      <div className  = "Login-button">
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
      <div className = "Decision">
        <div 
          className = "Banner"
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
          {house === 'gryffindor' && <img src = {gryffindor} className= "Houses-img" alt = "gryffindor" />}
          {house === 'hufflepuff' && <img src = {hufflepuff} className= "Houses-img" alt = "hufflepuff" />}
          {house === 'slytherin' && <img src = {slytherin} className= "Houses-img" alt = "slytherin" />}
          {house === 'ravenclaw' && <img src = {ravenclaw} className= "Houses-img" alt = "ravenclaw" />}
        </div>
        <p>
          your house is ... {house}
        </p>
      </div>
    )
  }
}

function getTopGenre(topArtists){
  let topFiveArtists = topArtists.slice(0,5);

  let genres = {
    pop: 0,
    randb: 0,
    edm: 0,
    rock: 0,
    rap: 0,
    alternative: 0,
    classical: 0,
    country: 0,
  }

  for( const artist of topFiveArtists){
    for (const genre of artist.genres){
      if (genre.includes('pop')) genres.pop++;
      if (genre.includes('r&b') || genre.includes('soul') || genre.includes('blues') || genre.includes('reggae') ) genres.randb++;
      if (genre.includes('rock') || genre.includes('metal') || genre.includes('dubstep')) genres.rock++;
      if (genre.includes('edm') || genre.includes('electronic') || genre.includes('house') || genre.includes('dance') || genre.includes('disco')) genres.edm++;
      if (genre.includes('rap') || genre.includes('hip') || genre.includes('trap')) genres.rap++;
      if (genre.includes('alternative') || genre.includes('bedroom') || genre.includes('indie')) genres.alternative++;
      if (genre.includes('classical') || genre.includes('jazz') || genre.includes('orchestra')) genres.classical++;
      if (genre.includes('country') || genre.includes('folk')) genres.country++;
    }
  }
  
  let max = 0;
  let topGenre;
  for (var genre in genres) {
    if (genres[genre] > max) {
      max = genres[genre]
      topGenre = genre;
    }
  }
  return topGenre;
    
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
      headers: { 'Authorization': "Bearer " + accessToken },
    }).then((response) => response.json()).then((data) =>
        this.setState({
          user: {
            name: data.display_name,
          },
        })
      );
    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      let topArtists = data.items;
      let mostListenedGenre = getTopGenre(topArtists);
      console.log(mostListenedGenre);
    })
  }
  render() {
    return (
      <div className="App">
        <Title></Title>
        {this.state.user ? (
          //content if user is signed in already
          <div className="Content">
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
