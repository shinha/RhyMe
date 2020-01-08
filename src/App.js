import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainFeed from './components/mainFeed'
import NavBar from './components/navBar'



function App() {
  return (
    <div className="App" style = {{width:'100%'}}>
      <header className="App-header">
        <NavBar/>
        <MainFeed/>
        <img className="App-logo" alt="logo" />
        <h2><input/></h2>
        <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
