// utils/tmdb.ts

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Fetch movies based on a search query
export const fetchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch movies for recommendations based on popularity
export const fetchMoviesForRecommendations = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies for recommendations');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies for recommendations:', error);
    return [];
  }
};

// Fetch detailed information about a specific movie by ID
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
