import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import Dashboard from './pages/Dashboard';
import WellnessHub from './pages/WellnessHub';
import ProfilePage from './pages/ProfilePage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wellness" element={<WellnessHub />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
