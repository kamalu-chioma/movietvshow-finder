// pages/index.tsx
import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Filters from '../components/Filters';

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-1">
        <Filters />
        <div className="w-3/4">
          <SearchBar />
          <MovieGrid />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
