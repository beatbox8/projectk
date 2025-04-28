import { Link } from "react-router-dom";
const DesktopNavbar = ({ handleLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">BeatBox Studio</Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav ms-auto">
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
            <button className="nav-link btn btn-link text-light" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
export default DesktopNavbar;
