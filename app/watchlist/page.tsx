// app/watchlist/page.tsx
"use client";

import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import Image from 'next/image';
import './watchlist.css';

const WatchlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container">
      {/* <h1>Your Watchlist</h1> */}
      <div className="wishlist-grid">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div key={movie.id} className="wishlist-card">
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
              <button onClick={() => removeFromWishlist(movie.id)}>
                Remove from Wishlist
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
