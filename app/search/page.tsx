// app/search/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react';
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

// Separate component to handle fetching and displaying movies
const SearchResultsContent = ({ query }: { query: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToWishlist } = useWishlist(); // Access addToWishlist from context

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

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="search-results">
      <h1>Search Results for &quot;{query}&quot;</h1>

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
        <p>No results found</p>
      )}
    </div>
  );
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsContent query={query} />
    </Suspense>
  );
};

export default SearchResults;
