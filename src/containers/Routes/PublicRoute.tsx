import { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated: User | null;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};
