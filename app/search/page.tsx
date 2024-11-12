// app/search-results/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct import for Next.js useSearchParams
import { fetchMovies } from '../utils/tmdb'; // Import the utility to fetch movies from TMDb
import Image from 'next/image'; // Import Image component from next/image
import { useWishlist } from '../context/WishlistContext'; // Import Wishlist context

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const SearchResults = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { addToWishlist } = useWishlist(); // Access addToWishlist from context

  // Fetch movies based on the search query
  useEffect(() => {
    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      if (query) {
        try {
          const results = await fetchMovies(query);
          setMovies(results);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch movies.');
        }
      }

      setLoading(false);
    };

    searchMovies();
  }, [query]);

  return (
    <div className="search-results">
      <h1>Search Results for &quot;{query}&quot;</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
              )}
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <button onClick={() => addToWishlist(movie)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg">
                Add to Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
