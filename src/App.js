import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainFeed from './components/mainFeed'



function App() {
  return (
    <div className="App" style = {{width:'100%'}}>
      <header className="App-header">
        <MainFeed/>
      </header>
    </div>
  );
}

export default App;
