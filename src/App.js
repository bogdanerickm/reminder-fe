import React from 'react';
import logo from './logo.svg';
import './App.css';
import SendReminder from './pages/SendReminder';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BoardPage from './pages/Board';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/board" component={BoardPage} />
        <Route path="/" component={SendReminder} />
      </Switch>
    </Router>
  );
}

export default App;
