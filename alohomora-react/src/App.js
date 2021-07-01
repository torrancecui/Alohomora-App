// import logo from './images/logo.svg';
// import hpLogo from './images/hpLogo.svg';
// import houses_img from "./images/houses.png";
import loginLogo from "./images/login_logo.svg";
import gryffindor from "./images/lion.png";
import slytherin from "./images/snake.png";
import hufflepuff from "./images/badger.png";
import ravenclaw from "./images/raven.png";
import React, { Component } from "react";
import queryString from "query-string";
import "./App.css";

const houses = ["hufflepuff", "gryffindor", "slytherin", "ravenclaw"];
let rand_num = Math.floor(Math.random() * 4);

class Gryffindor extends Component{
  render(){
    return <img src = {gryffindor} className= "Houses-img" alt = "houses" />
  }
}
class Slytherin extends Component{
  render(){
    return <img src = {slytherin} className= "Houses-img" alt = "houses" />
  }
}
class Hufflepuff extends Component{
  render(){
    return <img src = {hufflepuff} className= "Houses-img" alt = "houses" />
  }
}
class Ravenclaw extends Component{
  render(){
    return <img src = {ravenclaw} className= "Houses-img" alt = "houses" />
  }
}

class HouseDecision extends Component{
  render(){
    let houseIcon;
    let house = houses[rand_num];
    if (house === 'gryffindor'){
      houseIcon =  <Gryffindor />;
    }else if (house === 'slytherin'){
      houseIcon =  <Slytherin />;
    }else if (house === 'hufflepuff'){
      houseIcon =  <Hufflepuff />;
    }else if (house === 'ravenclaw'){
      houseIcon =  <Ravenclaw />;
    }
    return (
      <div>
        <div className = "Banner">
          {houseIcon}
        </div>
        <p>
          your house is ... {house}
        </p>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
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

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          playlists: data.items.map((item) => {
            console.log(data.items);
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: [],
            };
          }),
        })
      );
  }
  render() {
    return (
      <div className="App">
        <p className = "App-title">
          welcome to alohomora.
        </p>
        {this.state.user ? (
        //content if user is signed in already
          <header className="App-body">
            <p>
              hi {this.state.user.name}
            </p>
            <HouseDecision />
        </header>
        ) : (
        //content if user is NOT signed in
          <div className = "Login-page">
            <div className = "Login-logo">
              <img src = {loginLogo} className= "Login-img" alt = "login-img" />
            </div>
            <div className = "Login-button">
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
        )}
        <div className = "Credits">
            <p>developed by torrance</p>
            <p>hp credit to ms.rowling</p>
        </div>
      </div>
    );
  }
}

export default App;
