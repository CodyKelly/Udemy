import { Navbar } from './components/layout/Navbar';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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
    console.log(res.data);
  };

  // Clear users from state
  const clearUsers = () => setUsers([]);

  // Set alert
  const createAlert = (msg, type) => {
    setAlert({ msg, type });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert} />
        <Search
          searchUsers={searchUsers}
          clearUsers={clearUsers}
          showClear={users.length > 0}
          createAlert={createAlert}
        />
        <Users loading={loading} users={users} />
      </div>
    </div>
  );
}

export default App;
