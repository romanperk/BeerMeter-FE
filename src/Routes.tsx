import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BeerList from './pages/BeerList';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:uid/home" element={<Home />} />
      <Route path="/:uid/beerlist" element={<BeerList />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
