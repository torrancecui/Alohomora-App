// import logo from './logo.svg';
import hpLogo from './hpLogo.svg';
import houses from './houses.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className = "App-title">
          Welcome to Alohomora.
        </p>
        <img src = {houses} className= "Houses-img" alt = "houses" />
        <img src={hpLogo} className="App-logo" alt="hpLogo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Your house is...
        </a>
      </header>
    </div>
  );
}

export default App;
