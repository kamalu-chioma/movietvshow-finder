# Movie & TV Show Finder

Welcome to the Movie & TV Show Finder application! This app allows users to discover trending movies, search for movies by uploading a movie flier, and maintain a personalized watchlist. Built with Next.js, this application uses an image search API to identify movies based on uploaded images and recommends similar movies using cosine similarity based on the user’s watchlist.

## Application Link

Access the live application here: [Movie & TV Show Finder](https://movietvshow-finder-git-cjk-chiomas-projects-05e33234.vercel.app/)

## Features

- **Trending Movies**: View trending movies directly on the homepage.
- **Image Search**: Upload a movie flier to search for a movie. The app will identify the movie and return information about it.
- **Watchlist**: Add movies to your watchlist after logging in.
- **Personalized Recommendations**: Based on movies in your watchlist, the homepage provides recommendations for similar movies using cosine similarity.

## Getting Started

To start using the Movie & TV Show Finder, follow these steps:

1. **Visit the App**: Go to [https://movietvshow-finder.vercel.app/](https://movietvshow-finder.vercel.app/).
2. **Log In**: Use the following test credentials:
   - **Username**: Pelumi
   - **Password**: pass
3. **Explore**:
   - Upload a movie flier to find information on a specific movie.
   - Add movies to your watchlist to receive personalized recommendations.

## Tech Stack

- **Frontend**: Next.js
- **Backend API**: Image search API for movie identification

## Running Locally

To run the project locally, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd movie-tv-show-finder
npm install
npm run dev
