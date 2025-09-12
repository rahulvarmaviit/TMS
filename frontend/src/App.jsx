import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import HRDashboard from './pages/HRDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import Employee from './pages/Employee';
import InternDashboard from './pages/InternDashboard';
import HR from './pages/HR';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChooseRole from './pages/ChooseRole';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choose-role" element={<ChooseRole />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/hr/dashboard" element={<HRDashboard />} />
  <Route path="/manager/dashboard" element={<ManagerDashboard />} />
  <Route path="/employee/dashboard" element={<Employee />} />
  <Route path="/intern/dashboard" element={<InternDashboard />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["HR"]} />}>
            <Route path="/hr" element={<HR />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
