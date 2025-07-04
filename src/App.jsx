// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPages from './admin/Desktop/AdminPages';
import UserPages from './components/UserPages';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<AdminPages />} />
                <Route path="/admin/*" element={<AdminPages />} />
                <Route path="/customers/*" element={<UserPages />} />
                <Route path="/user/*" element={<UserPages />} />
            </Routes>
        </Router>
    );
};

export default App;