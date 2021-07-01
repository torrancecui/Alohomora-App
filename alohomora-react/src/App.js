// import logo from './logo.svg';
// import hpLogo from './hpLogo.svg';
import houses_img from "./houses.png";
import loginLogo from "./login_logo.svg";
import React, { Component } from "react";
import queryString from "query-string";
import "./App.css";

const houses = ["hufflepuff", "gryffindor", "slytherin", "ravenclaw"];
//random number between 0-3
let rand_num = Math.floor(Math.random() * 4);

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
            <div className = "Banner">
              <img src = {houses_img} className= "Houses-img" alt = "houses" />
            </div>
            <p>
              your house is ... {houses[rand_num]}
            </p>
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
