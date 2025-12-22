import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Nav/Navbar';
import Footer from './Footer/footer'; 

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <header>
        <Navbar />
      </header>

      
      <main className="flex-grow-1">
        <Outlet /> 
      </main>

      <footer>
        <Footer />
      </footer>
      
    </div>
  );
};

export default Layout;