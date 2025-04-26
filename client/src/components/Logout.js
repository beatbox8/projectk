import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Optionally clear user info as well

    // Redirect the user to the sign-in page (or any other desired route)
    navigate('/signin');

    // Optionally, you can display a logout message to the user
    console.log('Logged out successfully');
  }, [navigate]); // Add navigate to the dependency array to re-run effect if it changes

  // This component doesn't need to render anything visible as it performs a redirect
  return null;
}

export default Logout;