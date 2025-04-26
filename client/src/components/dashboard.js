import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Navbar from './utils/Navbar';
function Dashboard() {
  const navigate = useNavigate();
  const [showDashboard,setDashboard]=useState(false)

  const handleDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/check", {
        withCredentials: true,
      });
      console.log(response);
      console.log("Dashboard check successful:", response);
    } catch (error) {
      navigate("/");
      toast.error('unAuthorized User', {
        duration: 5000, // shows for 5 seconds
        position: 'top-center', // can be top-left, bottom-center, etc.
      });
      console.error("Error checking dashboard:", error.message);
    }
  };
  
  useEffect(() => {
    handleDashboard();
  }, []);


  return (
    <div className="container-fluid bg-light vh-100">
      {/* Navbar */}
      
      <Navbar/>

      {/* Hero Section */}
      <div className="jumbotron bg-info text-white text-center py-5">
        <h1 className="display-4">Welcome to Your BeatBox Studio!</h1>
        <p className="lead">Manage your studio effectively.</p>
        <hr className="my-4" />
        <p>Navigate through data, transactions, and set important reminders.</p>
        <a className="btn btn-light btn-lg" href="/data" role="button">Explore Data</a>
      </div>

      {/* Quick Access Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        <div className="col">
          <div className="card bg-warning text-white h-100 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">View Data</h5>
              <p className="card-text">Access and analyze your studio's information.</p>
              <a href="/data" className="btn btn-outline-light">Go to Data</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-success text-white h-100 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Manage Transactions</h5>
              <p className="card-text">Keep track of all financial activities.</p>
              <a href="/transactions" className="btn btn-outline-light">View Transactions</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-danger text-white h-100 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Set Reminders</h5>
              <p className="card-text">Stay organized with important notifications.</p>
              <a href="/reminders" className="btn btn-outline-light">Manage Reminders</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 BeatBox Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;