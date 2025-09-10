// Utility function to handle role-based redirection
export const getRoleBasedRoute = (role) => {
  const routes = {
    'Admin': '/admin/dashboard',
    'HR': '/hr/dashboard',
    'Manager': '/manager/dashboard',
    'Employee': '/employee/dashboard',
    'Intern': '/intern/dashboard'
  };
  
  return routes[role] || '/dashboard';
};

export const redirectToRoleBasedRoute = (role, navigate) => {
  const route = getRoleBasedRoute(role);
  navigate(route);
};