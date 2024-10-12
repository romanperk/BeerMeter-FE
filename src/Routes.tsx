import { Routes, Route } from 'react-router-dom';
import Home from './pages/Drawer/Home';
import BeerList from './pages/Drawer/BeerList';
import Auth from './pages/User/Auth';
import NotFoundPage from './pages/NotFound/NotFound';
import Beverage from './pages/Drawer/Beverage';
import { Food } from './pages/Drawer/Food';
import { History } from './pages/Drawer/History';
import { FavoritePlaces } from './pages/Drawer/FavoritePlaces';
import { DrinkingBuddies } from './pages/Drawer/DrinkingBuddies';
import { GeneralInfo } from './pages/Drawer/GeneralInfo';
import { Profile } from './pages/User/Profile';
import { ProfileSettings } from './pages/User/ProfileSettings';
import { User } from 'firebase/auth';
import NotLoggedIn from './pages/NotFound/NotLoggedIn';

interface AppRoutesProps {
  user: User | null;
}

const AppRoutes = ({ user }: AppRoutesProps) => {
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/beerlist" element={<BeerList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/beverage" element={<Beverage />} />
          <Route path="/food" element={<Food />} />
          <Route path="/history" element={<History />} />
          <Route path="/favoritePlaces" element={<FavoritePlaces />} />
          <Route path="/drinkingBuddies" element={<DrinkingBuddies />} />
          <Route path="/generalInfo" element={<GeneralInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileSettings" element={<ProfileSettings />} />
          <Route path="*" element={<NotFoundPage />} />
        </>
      ) : (
        <>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotLoggedIn />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
