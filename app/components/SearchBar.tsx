import React from 'react';

const SearchBar = () => {
  const searchBarStyle = {
    background: 'white',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center', 
  };

  const inputStyle = {
    flexGrow: 1,
    padding: '8px 16px',  
    border: '1px solid #ccc',
    borderRight: 'none',  
    borderRadius: '4px 0 0 4px',
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontWeight: 'bold',  
    fontSize: '16px',  
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.15)'  
  };

  return (
    <div style={searchBarStyle}>
      <input type="text" placeholder="Search movies or TV shows" style={inputStyle} />
      <button style={buttonStyle}>Search</button>
    </div>
  );
};

export default SearchBar;
