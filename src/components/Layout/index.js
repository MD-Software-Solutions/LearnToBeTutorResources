import React from 'react';
import './index.scss';  // For layout-specific styles
import NavBar from '../Menubar';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
