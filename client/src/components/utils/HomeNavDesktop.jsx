// HomeNavDesktop.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeNavDesktop = () => {
  const navigate = useNavigate();
  const login = () => navigate('/signin');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">Beatbox Dance Studio</a>

        <div className="d-flex justify-content-end flex-grow-1">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link active" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#classes">Classes</a></li>
            <li className="nav-item"><a className="nav-link" href="#instructors">Instructors</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm rounded-pill ms-3" onClick={login}>Sign In</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavDesktop;
