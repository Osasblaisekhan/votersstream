import React from 'react'
import './notFound.css'

import Header from './header';

import Main from './main';
import Footer from './footer';

const GeneralNotFound = () => {
  return (
    <div  className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      <div id='container-two'>
        <div id='header'>
          <div>
            <Header />
          </div>
        </div>

        <div id='main-sec'>
          <div>
            <Main />
          </div>
        </div>

        <div id='footer-sec'>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default GeneralNotFound
