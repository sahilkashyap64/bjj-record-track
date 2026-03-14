import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { seedDatabase } from './db/seedData';

// Pages
import Home from './pages/Home';
import Logs from './pages/Logs';
import NewLog from './pages/NewLog';
import LogDetail from './pages/LogDetail';
import Stats from './pages/Stats';
import Focus from './pages/Focus';
import Notes from './pages/Notes';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    // Initialize database with seed data on first run
    seedDatabase().catch(console.error);

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, app will still work
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/logs/new" element={<NewLog />} />
        <Route path="/logs/:id" element={<LogDetail />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;