import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Patients from '@/pages/Patients';
import PatientProfile from '@/pages/PatientProfile';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import { Toaster } from 'sonner';
import { auth, isMockEnv } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (isMockEnv) {
      // In mock env, we just set loading to false to allow login page to render
      // Authentication is handled via local state in the mock scenario
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
