import { Routes, Route, Navigate } from 'react-router-dom';
import OverlayPage from './pages/OverlayPage';
import DashboardPage from './pages/DashboardPage';
import CompanionPage from './pages/CompanionPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overlay" replace />} />
      <Route path="/overlay" element={<OverlayPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/companion" element={<CompanionPage />} />
    </Routes>
  );
}
