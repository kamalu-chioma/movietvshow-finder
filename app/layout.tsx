// app/layout.tsx

import React, { ReactNode } from 'react';
import localFont from 'next/font/local';
import './styles/globals.css';
import Chatbot from './components/Chatbot';
import styles from './styles/Layout.module.css';
import Footer from './components/Footer';
import { WishlistProvider } from './context/WishlistContext';

// Custom fonts setup
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata for the application
export const metadata = {
  title: 'Movie/TV Finder',
  description: 'Find your favorite movies and TV shows',
};

// Root layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Find your favorite movies and TV shows" />
        <title>Movie/TV Finder</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WishlistProvider> {/* Provides global wishlist state */}
          <div className={styles.layout}>
            <header className={styles.header}>
              <h1>Movie/TV Finder</h1>
              <nav className={styles.nav}>
                <a href="/" className={styles.link}>Home</a>
                <a href="/watchlist" className={styles.link}>Watchlist</a>
                <a href="/login" className={styles.link}>Login</a>
              </nav>
            </header>
            
            <main className={styles.main}>
              {children}
            </main>

            <Footer /> {/* Footer component */}
            
            <Chatbot /> {/* Chatbot component */}
          </div>
        </WishlistProvider>
      </body>
    </html>
  );
}
