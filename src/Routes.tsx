import { Routes, Route } from 'react-router-dom';
import { Lists } from './pages/Drawer/Lists';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import NotFoundPage from './pages/NotFound/NotFound';
import { History } from './pages/Drawer/History';
import { FavoritePlaces } from './pages/Drawer/FavoritePlaces';
import { DrinkingBuddies } from './pages/Drawer/DrinkingBuddies';
import { SuggestEdit } from './pages/Drawer/SuggestEdit';
import Profile from './pages/Profile/Profile';
import NotLoggedIn from './pages/NotFound/NotLoggedIn';
import { SetUpProfile } from './pages/Auth/SetUpProfile';
import { PublicRoute } from './containers/Routes/PublicRoute';
import { PrivateRoute } from './containers/Routes/PrivateRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/Drawer/Home';
import ListDetail from './pages/ListDetail/ListDetail';
import { Session } from '@supabase/supabase-js';
import ItemDetail from './pages/ItemDetail/ItemDetail';

interface AppRoutesProps {
  authState: Session | null;
}

const AppRoutes = ({ authState }: AppRoutesProps) => {
  return (
    <Routes>
      {/* Public or Private Route based on authentication */}
      <Route
        path="/"
        element={
          authState ? (
            <PrivateRoute isAuthenticated={authState}>
              <HomePage />
            </PrivateRoute>
          ) : (
            <PublicRoute isAuthenticated={authState}>
              <LandingPage />
            </PublicRoute>
          )
        }
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={authState}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={authState}>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Private Routes */}
      <Route
        path="/lists"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <Lists />
          </PrivateRoute>
        }
      />
      <Route
        path="/lists/:id"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <ListDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/lists/:listId/item/:itemId"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <ItemDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/setUp"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <SetUpProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/favoritePlaces"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <FavoritePlaces />
          </PrivateRoute>
        }
      />
      <Route
        path="/drinkingBuddies"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <DrinkingBuddies />
          </PrivateRoute>
        }
      />
      <Route
        path="/suggestEdit"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <SuggestEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute isAuthenticated={authState}>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Catch-all route for unauthorized users */}
      <Route path="*" element={authState ? <NotFoundPage /> : <NotLoggedIn />} />
    </Routes>
  );
};

export default AppRoutes;
