import { Session } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated: Session | null;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};
