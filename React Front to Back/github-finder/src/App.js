import { Navbar } from './components/layout/Navbar';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  // Search Github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=
      ${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    setUser(res.data);
    setLoading(false);
  };

  // Get a Github user's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => setUsers([]);

  // Set alert
  const createAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    createAlert={createAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/user/:login"
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
