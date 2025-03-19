// Authentication Wrapper Component
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
    const isLoggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored during login

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;