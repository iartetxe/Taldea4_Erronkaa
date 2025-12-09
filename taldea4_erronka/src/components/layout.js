import React from 'react';
import Navbar from './Nav/Navbar';
import Footer from '../components/Footer/footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;