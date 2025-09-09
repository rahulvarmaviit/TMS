import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import HR from './pages/HR';
import Employee from './pages/Employee';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['hr']} />}>
          <Route path="/hr" element={<HR />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/employee" element={<Employee />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
