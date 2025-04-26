import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { MdCancelPresentation } from 'react-icons/md';

function HomeMobileNavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const login = () => {
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-dark bg-primary sticky-top">
      <div className="container d-flex flex-column">
        
        {/* Top Bar */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <a className="navbar-brand fw-bold mb-0" href="/">Beatbox Dance Studio</a>
          <button 
            className="btn text-light fs-4 p-1 border-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdCancelPresentation /> : <IoMenu />}
          </button>
        </div>

        {/* Collapsible Links */}
        {menuOpen && (
          <ul className="navbar-nav mt-3 w-100 text-start text-lg-start">
            <li className="nav-item">
              <a className="nav-link active" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#classes">Classes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#instructors">Instructors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item mt-2">
              <button className="btn btn-outline-light btn-sm rounded-pill " onClick={login}>
                Sign In
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default HomeMobileNavBar;
