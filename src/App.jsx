import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import AdminPages from './admin/Desktop/AdminPages';
import UserPages from './components/UserPages';
import AdminLogin from './Auth/AdminLogin';
import UserLogin from './Auth/userLogin';
import LandingPageRoute from './LandingPageComponent/LandingPageRoute';
import Signup from './Auth/userSignup';
import PrivateRoute from './Auth/PrivateRoute';
import GeneralNotFound from './Notfound/GeneralNotFound';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageRoute />} />
        
          <Route path="/admin/login/*" element={<AdminLogin />} />

          <Route path="/user/login/*" element={<UserLogin />} />

          <Route 
            path="/admin/*" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPages />
              </PrivateRoute>
            } 
          />

          <Route path="/user/signup" element={<Signup />} />

          <Route 
            path="/user/*" 
            element={
              <PrivateRoute requiredRole="user">
                <UserPages />
              </PrivateRoute>
            } 
          />

          <Route path='*' element={<GeneralNotFound />}/>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;