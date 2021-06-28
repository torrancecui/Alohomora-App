// import logo from './logo.svg';
// import hpLogo from './hpLogo.svg';
import houses from './houses.png';
import './App.css';

function App() {
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
            <img src = {houses} className= "Houses-img" alt = "houses" />
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
          your house is ...
        </a>
        <p className = "Credits"> developed by torrance cui. all harry potter credit to jk rowling.</p>
      </header>
    </div>
  );
}

export default App;
