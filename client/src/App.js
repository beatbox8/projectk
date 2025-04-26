import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BeatboxDanceStudio from './components/home';
import SignIn from './components/signIn';
import Dashboard from './components/dashboard';
import Data from './components/data';
import Transactions from './components/transaction';
import Reminders from './components/reminders';
import Logout from './components/Logout';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BeatboxDanceStudio />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<Data />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
