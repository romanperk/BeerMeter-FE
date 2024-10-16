import { Routes, Route } from 'react-router-dom';
import Home from './pages/Drawer/Home';
import { Lists } from './pages/Drawer/Lists';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import NotFoundPage from './pages/NotFound/NotFound';
import { History } from './pages/Drawer/History';
import { FavoritePlaces } from './pages/Drawer/FavoritePlaces';
import { DrinkingBuddies } from './pages/Drawer/DrinkingBuddies';
import { GeneralInfo } from './pages/Drawer/GeneralInfo';
import Profile from './pages/User/Profile';
import NotLoggedIn from './pages/NotFound/NotLoggedIn';
import { User } from 'firebase/auth';

interface AppRoutesProps {
  user: User | null;
}

const AppRoutes = ({ user }: AppRoutesProps) => {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/history" element={<History />} />
          <Route path="/favoritePlaces" element={<FavoritePlaces />} />
          <Route path="/drinkingBuddies" element={<DrinkingBuddies />} />
          <Route path="/generalInfo" element={<GeneralInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotLoggedIn />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
