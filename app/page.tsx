// pages/index.js
import React from 'react';
import Layout from '../app/components/Layout';
import SearchBar from '../app/components/SearchBar';
import MovieGrid from '../app/components/MovieGrid';
import Filters from '../app/components/Filters';

const Home = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Filters />
        <div style={{ width: '75%' }}>
          <SearchBar />
          <MovieGrid />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
