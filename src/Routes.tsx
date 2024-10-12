import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BeerList from './pages/BeerList';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFound';
import { Beverage } from './pages/Beverage';
import { Food } from './pages/Food';
import { History } from './pages/History';
import { FavoritePlaces } from './pages/FavoritePlaces';
import { DrinkingBuddies } from './pages/DrinkingBuddies';
import { GeneralInfo } from './pages/GeneralInfo';
import { Profile } from './pages/Profile';
import { ProfileSettings } from './pages/ProfileSettings';

const AppRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRoutes;
