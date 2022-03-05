import { Navbar } from './components/layout/Navbar';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [alert, setAlert] = useState(null);

  // Set alert
  const createAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <Search createAlert={createAlert} />
                    <Users />
                  </Fragment>
                }
              />
              <Route path="/about" element={<About />}></Route>
              <Route path="/user/:login" element={<User />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
