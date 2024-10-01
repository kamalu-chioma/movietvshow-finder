// components/Filters.js
import React from 'react';

const Filters = () => {
  const filtersStyle = {
    width: '25%',
    background: 'white',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    marginBottom: '10px'
  };

  const filterGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    margin: '5px 0'
  };

  const inputRangeStyle = {
    width: '100%'
  };

  const selectStyle = {
    width: '100%'
  };

  return (
    <aside style={filtersStyle}>
      <h2 style={headingStyle}>Filters</h2>
      <div style={filterGroupStyle}>
        <h3 style={headingStyle} id="genre-label">Genre</h3>
        <div aria-labelledby="genre-label">
          <label style={labelStyle}><input type="checkbox" name="action" aria-label="Action" /> Action</label>
          <label style={labelStyle}><input type="checkbox" name="comedy" aria-label="Comedy" /> Comedy</label>
          <label style={labelStyle}><input type="checkbox" name="drama" aria-label="Drama" /> Drama</label>
        </div>
      </div>
      <div style={filterGroupStyle}>
        <h3 style={headingStyle} id="year-label">Release Year</h3>
        <input type="range" min="2000" max="2025" aria-labelledby="year-label" style={inputRangeStyle} />
      </div>
      <div style={filterGroupStyle}>
        <h3 style={headingStyle} id="rating-label">Rating</h3>
        <select aria-labelledby="rating-label" style={selectStyle}>
          <option>All Ratings</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★</option>
          <option value="3">★★★</option>
        </select>
      </div>
    </aside>
  );
};

export default Filters;
