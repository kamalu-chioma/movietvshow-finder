import React, { CSSProperties, ReactNode } from 'react';
import Footer from './Footer';  // assuming this is in the components directory

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const layoutStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const headerStyle: CSSProperties = {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  };

  const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center'
  };

  const linkStyle: CSSProperties = {
    color: 'white',
    marginLeft: '20px',
    textDecoration: 'none'
  };

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        {/* Logo Image */}
        <img src="/images/movies-ai-finder-high-resolution-logo.png" alt="Logo" style={{ width: 'auto', height: '40px' }} />
        <nav style={navStyle}>
          <a href="#" style={linkStyle}>Home</a>
          <a href="#" style={linkStyle}>Watchlist</a>  
          <a href="#" style={{ ...linkStyle, marginRight: '0' }}>Login</a>
        </nav>
      </header>
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
