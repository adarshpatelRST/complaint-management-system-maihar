import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { LodgeComplaintPage } from './pages/LodgeComplaintPage';
import { LoginPage } from './pages/LoginPage';
import { OfficerPanelPage } from './pages/OfficerPanelPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { ComplaintProvider } from './store/ComplaintContext';

export default function App() {
  return (
    <HashRouter>
      <ComplaintProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lodge" element={<LodgeComplaintPage />} />
            <Route path="/track" element={<TrackComplaintPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/officer" element={<OfficerPanelPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ComplaintProvider>
    </HashRouter>
  );
}
