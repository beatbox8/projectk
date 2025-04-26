const DesktopNavbar = ({ handleLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">BeatBox Studio</a>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link active" href="/dashboard">Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="/data">Data</a></li>
            <li className="nav-item"><a className="nav-link" href="/transactions">Transactions</a></li>
            <li className="nav-item"><a className="nav-link" href="/reminders">Reminders</a></li>
            <li className="nav-item ">
              <button className="nav-link btn btn-link text-light" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
export default DesktopNavbar;  