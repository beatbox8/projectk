import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error2, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signin', // Ensure URL is correct
        {
          email,
          password
        },
        {
          withCredentials: true // This tells axios to send and receive cookies
        }
      );
  
      const data = response.data;
      navigate('/dashboard'); // Redirect to dashboard
      toast.success('Sign In successful', {
        duration: 3000, // shows for 5 seconds
        position: 'top-center', // can be top-left, bottom-center, etc.
      });
      console.log('Sign In successful:', data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Sign In failed'); // Display error message
      toast.error('Invalid Credentials', {
        duration: 3000, // shows for 5 seconds
        position: 'top-center', // can be top-left, bottom-center, etc.
      });
      console.error('Sign In failed:', error);
    } finally {
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    }
  };
  
  return (
    <div className="container-fluid bg-dark text-light d-flex align-items-center justify-content-center vh-100">
      <div className="bg-secondary p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-info text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;