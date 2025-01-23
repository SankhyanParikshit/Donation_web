import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CampaignProvider } from './components/context/CampaignContext'; // Use CampaignProvider
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Eyes from './components/Eyes';
import Featured from './components/Featured';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import Community from './components/Community';
import Social from './components/Social';
import LocomotiveScroll from 'locomotive-scroll';

// Admin Panel Imports
import AdminPanel from './components/admin/Adminpanel';
import SignIn from './components/auth/Sign_in';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on initial load
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Ideally, verify the token with the backend
      setIsAuthenticated(true);
    }

    // Initialize Locomotive Scroll
    const locomotiveScroll = new LocomotiveScroll();

  }, []);

  const AuthCheck = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <CampaignProvider> {/* Wrap your app in the CampaignProvider */}
      <Router>
        <Routes>
          {/* Main route with all sections */}
          <Route
            path="/"
            element={
              <div className="w-full h-screen" data-scroll-container>
                <Navbar />
                <LandingPage />
                <div id="target-section" className="bg-gray-100 mt-[4rem]">
                  <Marquee />
                </div>
                <About />
                <Eyes />
                <Featured />
                <Footer />
              </div>
            }
          />

          {/* Separate routes for Community and Social pages */}
          <Route path="/community" element={<Community />} />
          <Route path="/social" element={<Social />} />

          {/* Sign-In Route */}
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />

          {/* Admin Panel Route */}
          <Route
            path="/admin/*"
            element={
              <AuthCheck>
                <AdminPanel />
              </AuthCheck>
            }
          />
        </Routes>
      </Router>
    </CampaignProvider>
  );
};

export default App;
