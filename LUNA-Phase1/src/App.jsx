import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useCycleStore } from './store/cycleStore';
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
// Phase 4 pages
import CommunityRooms from './pages/CommunityRooms';
import RoomView from './pages/RoomView';
import AdminDashboard from './pages/AdminDashboard';
// Phase 5 pages
import LunaInsights from './pages/LunaInsights';
import './index.css';

// Auth guard — sends unauthenticated users to /auth
function Protected({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
      {/* Protected Phase 4 */}
      <Route path="/rooms" element={<Protected><CommunityRooms /></Protected>} />
      <Route path="/room/:id" element={<Protected><RoomView /></Protected>} />
      <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
      {/* Protected Phase 5 */}
      <Route path="/insights" element={<Protected><LunaInsights /></Protected>} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const refreshPhase = useCycleStore((state) => state.refreshPhase);

  useEffect(() => {
    refreshPhase();
  }, [refreshPhase]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

