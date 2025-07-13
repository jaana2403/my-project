import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { HistoricalAnalysis } from "./components/HistoricalAnalysis";
import { ThreatLibrary } from "./components/ThreatLibrary";
import FeedHealth from "./components/FeedHealth";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Navbar */}
        <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold text-blue-400">Threat Intel</h1>
          <div className="space-x-6 text-sm">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link to="/historical" className="hover:text-blue-400">Historical Analysis</Link>
            <Link to="/library" className="hover:text-blue-400">Threat Library</Link>
            <Link to="/feed-health" className="hover:text-blue-400">Feed Health</Link>
          </div>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historical" element={<HistoricalAnalysis />} />
          <Route path="/library" element={<ThreatLibrary />} />
          <Route path="/feed-health" element={<FeedHealth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
