import React from 'react';
import { Students } from './components/Students';
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="students" element={<Students />} />
        </Route>
        <Route path="/signin" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
