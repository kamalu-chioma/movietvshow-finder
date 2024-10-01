import React, { CSSProperties } from 'react';

interface MovieCardProps {
  title: string;
  genre: string;
  year: number;
}

const MovieCard = ({ title, genre, year }: MovieCardProps) => {
  const cardStyle: CSSProperties = {
    background: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 20px', 
    textAlign: 'center', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '200px' 
  };

  const posterStyle: CSSProperties = {
    background: '#ddd',
    height: '300px',
    marginBottom: '10px'
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px', 
    cursor: 'pointer',
    fontWeight: 'bold' 
  };

  return (
    <div style={cardStyle}>
      <div style={posterStyle}>Movie Poster</div>
      <div>
        <h3>{title}</h3>
        <p>{`${year} | ${genre}`}</p>
        <button style={buttonStyle}>+ Watchlist</button>
      </div>
    </div>
  );
};

export default MovieCard;
