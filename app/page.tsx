// app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
// import Filters from './components/Filters';
import { fetchPopularMovies, fetchMoviesForRecommendations } from './utils/tmdb';
import './styles/globals.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlist } from './context/WishlistContext';
import { cosineSimilarity } from './utils/cosineSimilarity';

// Movie type with additional genres and rating
interface Movie {
  id: number;
  title: string;
  genres?: string[]; 
  rating?: number;   
  poster_path: string;
  release_date: string;
  vote_average: number;
}




// Extended Movie type to include similarityScore
interface RecommendedMovie extends Movie {
  similarityScore: number;
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToWishlist, wishlist } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      const storedUsername = localStorage.getItem('username');

      if (loggedInStatus === 'true' && storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch popular movies');
      } finally {
        setLoading(false);
      }
    };

    // Helper function to calculate similarity score for each movie
    const calculateSimilarityScore = (movie: Movie): number => {
      let totalSimilarity = 0;
    
      for (const watchlistMovie of wishlist) {
        const watchlistVector = createFeatureVector(watchlistMovie);
        const movieVector = createFeatureVector(movie);
        const similarity = cosineSimilarity(watchlistVector, movieVector) || 0;
        totalSimilarity += similarity;
      }
    
      const normalizedScore = wishlist.length > 0 ? totalSimilarity / wishlist.length : 0;
    
      // Adding a small random variation to avoid identical scores
      return `${(normalizedScore * 80 + Math.random() * 5)}`;
    };
    
    
    
    const fetchRecommendations = async () => {
      if (wishlist.length === 0) {
        setRecommendedMovies([]);
        return;
      }

      try {
        const imdbMovies: Movie[] = await fetchMoviesForRecommendations();
        
        const recommendations: RecommendedMovie[] = imdbMovies
          .map((movie: Movie) => {
            const similarityScore = calculateSimilarityScore(movie); // Ensures similarityScore is a number
            return { ...movie, similarityScore }; // Return movie with similarityScore
          })
          .sort((a: RecommendedMovie, b: RecommendedMovie) => b.similarityScore - a.similarityScore)
          .slice(0, 12); // Take the top 12 recommendations

        setRecommendedMovies(recommendations);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch recommendations.");
      }
    };

    fetchMovies();
    fetchRecommendations();
  }, [wishlist]);
const handleLogin = (username: string) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
  setIsLoggedIn(true);
  setUsername(username);
};

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
  router.push('/login'); // Redirect to login page after logout
};


  const createFeatureVector = (movie: Movie): number[] => {
    const genreVector = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance"].map((genre) =>
      movie.genres?.includes(genre) ? 1 : 0
    );
    const ratingNormalized = (movie.vote_average || 0) / 10; // Normalize rating to a value between 0 and 1
    return [...genreVector, ratingNormalized];
  };

  const handleAddToWishlist = (movie: Movie) => {
    if (isLoggedIn) {
      addToWishlist(movie);
    } else {
      alert('Please log in to add items to your watchlist.');
      router.push('/login');
    }
  };
  return (
    <div className="container">
      {isLoggedIn && (
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => handleLogin('Guest')}>Login</button>
          )}
          
          <div className="admin-greeting">
            <h2><strong>Hello, {username}!</strong></h2>
          </div>
        </div>
      )}
  
      {/* <div className="sidebar">
        <Filters />
      </div>
   */}
      <div className="content">
        <SearchBar />
  
        {recommendedMovies.length > 0 && (
          <div>
            <h1><strong>Recommended for You </strong></h1>
            <div className="movie-grid">
              {recommendedMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      width={200}
                      height={300}
                      priority 
                    />
                  )}
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                  <p>Match: {movie.similarityScore.toFixed(2)}%</p>
                  <button onClick={() => handleAddToWishlist(movie)}>
                    Add to Watchlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div>
            <h1><strong>Trending Now</strong></h1>
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
                  <button onClick={() => handleAddToWishlist(movie)}>
                    Add to Watchlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
