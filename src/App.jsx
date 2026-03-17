import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import Dashboard from './pages/Dashboard';
import WellnessHub from './pages/WellnessHub';
import GoogleIntegrations from './pages/GoogleIntegrations';
import ProfilePage from './pages/ProfilePage';
// Phase 2 pages
import LunaJournal from './pages/LunaJournal';
import CravingKitchen from './pages/CravingKitchen';
import HusbandHangout from './pages/HusbandHangout';
import ExplorePage from './pages/ExplorePage';
// Phase 3 pages
import AuthPage from './pages/AuthPage';
import SymptomValidator from './pages/SymptomValidator';
import CalmCorner from './pages/CalmCorner';
import LunaPremium from './pages/LunaPremium';
import NotificationCentre from './pages/NotificationCentre';
import './index.css';

// Auth guard — sends unauthenticated users to /auth
function Protected({ children }) {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      {/* Onboarding (semi-public — accessible after sign-up) */}
      <Route path="/onboarding" element={<OnboardingFlow />} />
      {/* Protected Phase 1 */}
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/wellness" element={<Protected><WellnessHub /></Protected>} />
      <Route path="/integrations" element={<Protected><GoogleIntegrations /></Protected>} />
      <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
      {/* Protected Phase 2 */}
      <Route path="/journal" element={<Protected><LunaJournal /></Protected>} />
      <Route path="/craving-kitchen" element={<Protected><CravingKitchen /></Protected>} />
      <Route path="/hangout" element={<Protected><HusbandHangout /></Protected>} />
      <Route path="/explore" element={<Protected><ExplorePage /></Protected>} />
      {/* Protected Phase 3 */}
      <Route path="/symptoms" element={<Protected><SymptomValidator /></Protected>} />
      <Route path="/calm" element={<Protected><CalmCorner /></Protected>} />
      <Route path="/premium" element={<Protected><LunaPremium /></Protected>} />
      <Route path="/notifications" element={<Protected><NotificationCentre /></Protected>} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

