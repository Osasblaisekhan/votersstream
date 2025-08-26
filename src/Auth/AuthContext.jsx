import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount and handle page refresh
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle storage events (when localStorage changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Error parsing user data from storage event:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      setUser(newUserData);
      localStorage.setItem('currentUser', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Don't render children until we've checked localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};