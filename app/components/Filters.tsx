"use client";

import React, { useState } from 'react';
// Import Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // Import the filter icon

const Filters = () => {
  const filtersStyle: React.CSSProperties = {
    width: '120%',
    background: 'white',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px' // Adds space between each filter group
  };

  const headingStyle = {
    marginBottom: '10px',
    fontSize: '1.2rem', // Increase font size slightly for headings
    fontWeight: 'bold',
    display: 'flex', // Display as flex to align icon and text
    alignItems: 'center', // Vertically align text and icon
    gap: '10px' // Adds space between the icon and text
  };

  const filterGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Adds space between checkbox and label
    margin: '5px 0'
  };

  const inputRangeStyle = {
    width: '100%',
    marginTop: '10px' // Adds space between slider label and the slider itself
  };

  const selectStyle = {
    width: '100%',
    padding: '10px', // Adds padding for dropdown to make it look cleaner
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const [releaseYear, setReleaseYear] = useState(2020);

  return (
    <aside style={filtersStyle}>
      {/* Filters Heading with Icon */}
      <h2 style={headingStyle}>
        <FontAwesomeIcon icon={faFilter} /> {/* Add the filter icon here */}
        Filters
      </h2>

      {/* Genre Filter */}
      <div style={filterGroupStyle}>
        <h3 style={headingStyle} id="genre-label">Genre</h3>
        <div aria-labelledby="genre-label">
          <label style={labelStyle}>
            <input type="checkbox" name="action" aria-label="Action" /> 
            Action
          </label>
          <label style={labelStyle}>
            <input type="checkbox" name="comedy" aria-label="Comedy" /> 
            Comedy
          </label>
          <label style={labelStyle}>
            <input type="checkbox" name="drama" aria-label="Drama" /> 
            Drama
          </label>
          <label style={labelStyle}>
            <input type="checkbox" name="horror" aria-label="Horror" /> 
            Horror
          </label>
          <label style={labelStyle}>
            <input type="checkbox" name="romance" aria-label="Romance" /> 
            Romance
          </label>
        </div>
      </div>

      {/* Release Year Filter */}
      <div style={filterGroupStyle}>
        <h3 style={headingStyle} id="year-label">Release Year</h3>
        <input
          type="range"
          min="1960"
          max="2025"
          value={releaseYear}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          aria-labelledby="year-label"
          style={inputRangeStyle}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {releaseYear}
        </div>
      </div>

      {/* Rating Filter */}
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
