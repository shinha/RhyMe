import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Barstropica</h1>
        <h2>Welcome to Barstropica v1.0.</h2>
        <div className="Step-1">
          <Container>
            <Row className="justify-content-md-center">
              <Col> Step 1: Enter a theme or topic you want to talk about</Col>
              <Col> <input/></Col>
            </Row>
          </Container>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <h2><input/></h2>
        <p>
          Welcome CodeAcademy!
        </p>
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
