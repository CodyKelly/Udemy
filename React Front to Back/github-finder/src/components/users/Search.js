import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Users from './Users';

export default function Search({
  searchUsers,
  clearUsers,
  showClear,
  createAlert,
}) {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      createAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};
