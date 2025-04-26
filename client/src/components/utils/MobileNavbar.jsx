import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";

function MobileNavbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex flex-column">

        {/* Top Bar */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <a className="navbar-brand mb-0" href="/">BeatBox Studio</a>
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
              <a className="nav-link active" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/data">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/transactions">Transactions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reminders">Reminders</a>
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
