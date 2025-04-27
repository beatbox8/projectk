import React from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import useScreenSize from './useScreenSize';
import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'

function Navbar() {

    const navigate = useNavigate();
    const isMobile = useScreenSize();
    const handleLogout = async() => {
        try {
          const response = await axios.post(
            'https://beat-box-backend.onrender.com/api/auth/signout',
            {}, 
          {
            withCredentials: true 
          }
          );
      
          const data = response.data;
          navigate('/signin');
          console.log(data);
        } catch (error) {
          console.error('Sign Out failed:', error);
        }
      };

      return isMobile ? (
        <MobileNavbar handleLogout={handleLogout} />
      ) : (
        <DesktopNavbar handleLogout={handleLogout} />
      );
}

export default Navbar
