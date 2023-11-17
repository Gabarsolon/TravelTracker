import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Navbar component */}
      <Navbar title='TravelTracker' />

      {/* Main content */}
      <div className="app">
        <div className="left-section">
        </div>
        <div className="content-section">
            {children}
        </div>
        <div className="right-section">
        </div>
      </div>

    </div>
  );
};

export default Layout;
