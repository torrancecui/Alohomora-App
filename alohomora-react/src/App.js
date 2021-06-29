// import logo from './logo.svg';
// import hpLogo from './hpLogo.svg';
import houses_img from './houses.png';
import React, {Component} from 'react';
import queryString from 'query-string';
import './App.css';

const houses = ["hufflepuff", "gryffindor", "slytherin", "ravenclaw"];
//random number between 0-3
let rand_num = Math.floor( (Math.random() * 4));

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
    }
  }
  //not sure if working
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p className = "App-title">
            welcome to alohomora.
          </p>
          <div className = "Banner">
            <div className = "centerBanner"> 
              <img src = {houses_img} className= "Houses-img" alt = "houses" />
            </div>
          </div>
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            your house is ... {houses[rand_num]}
          </a>
        </header>
        <div className = "Credits">
            <p>developed by torrance</p>
            <p>hp credit to ms.rowling</p>
        </div>
      </div>
    );
  }
}

export default App;
