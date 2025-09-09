import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import HR from './pages/HR';
import Employee from './pages/Employee';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['HR']} />}>
          <Route path="/hr" element={<HR />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Employee']} />}>
          <Route path="/employee" element={<Employee />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
