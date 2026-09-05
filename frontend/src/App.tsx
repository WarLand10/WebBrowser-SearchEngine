import React, { useEffect, useState } from 'react';
import { BrowserProvider } from './context/BrowserContext';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import Browser from './components/Browser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-600">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserProvider>
      {isAuthenticated ? (
        <Browser />
      ) : (
        <>
          <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
          {/* Or show Home page with Search Engine preview */}
          {/* <HomePage /> */}
        </>
      )}
    </BrowserProvider>
  );
}

export default App;
