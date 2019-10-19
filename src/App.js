import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/scss/material-kit-react.scss?v=1.8.0";
// pages for this product
import Components from "./views/Components/Components.js";
import LandingPage from "./views/LandingPage/LandingPage.js";
import ArticlePage from "./views/articles/ArticlePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/e/:slug?" component={ArticlePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/g" component={Components} />
        </Router>
      </div>
    );
  }
}

export default App
