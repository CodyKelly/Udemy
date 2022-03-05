import { Navbar } from './components/layout/Navbar';
import React, { Fragment } from 'react';
import './App.css';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Fragment>
                      <Search />
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
    </AlertState>
  );
}

export default App;
