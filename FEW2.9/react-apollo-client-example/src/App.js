import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Github from './Github';
import API from './API';
import Home from './Home';
import './App.css';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/github">Github</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pics">Pics</Link>
        </li>
      </ul>

      <hr />

      <Route path="/github" component={Github} />
      <Route exact path="/" component={Home}></Route>
      <Route path="/pics" component={API}></Route>
    </div>
  </Router>
);


export default App;
