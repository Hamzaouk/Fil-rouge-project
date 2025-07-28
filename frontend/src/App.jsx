import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <div className="flex-grow pt-20">
          <Routes>
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;