// components/MovieGrid.js
import React, { CSSProperties } from 'react';
import MovieCard from './MovieCard';

const movies = [
  { title: 'Movie Title 1', genre: 'Action', year: 2025 },
  { title: 'Movie Title 2', genre: 'Comedy', year: 2025 },
  { title: 'Movie Title 3', genre: 'Drama', year: 2025 },
  { title: 'Movie Title 4', genre: 'Thriller', year: 2025 },
];

const gridStyle: CSSProperties = {
  display: 'flex',
  overflowX: 'auto',  
  padding: '4px'
};

const MovieGrid = () => {
  return (
    <div style={gridStyle}>
      {movies.map((movie, index) => (
        <MovieCard key={index} title={movie.title} genre={movie.genre} year={movie.year} />
      ))}
    </div>
  );
};

export default MovieGrid;
