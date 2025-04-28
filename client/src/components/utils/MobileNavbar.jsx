import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";

function MobileNavbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex flex-column">

        {/* Top Bar */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Link className="navbar-brand mb-0" to="/">BeatBox Studio</Link>
          <button 
            className="btn text-light fs-4 p-1 border-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdCancelPresentation size={32}/> : <IoMenu size={32}/>}
          </button>
        </div>

        {/* Collapsible Menu */}
        {menuOpen && (
          <ul className="navbar-nav mt-3 w-100">
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/data">Data</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transactions">Transactions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reminders">Reminders</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-light px-0" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default MobileNavbar;
