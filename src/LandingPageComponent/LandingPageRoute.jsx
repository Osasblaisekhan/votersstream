import React from 'react'
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandinPage';

const LandingPageRoute = () => {
  return (
    <div>
      <div>
        <Routes>
            <Route path='/*' exact element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default LandingPageRoute;
