import React from 'react';
import Navbar from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchesPage from './pages/MatchesPage';
import NewsPage from './pages/NewsPage';
import { Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './components/Shop/ProductDetailPage';
import MatchDetailPage from './components/Matches/MatchDetailPage';
import ForgotUsername from './pages/ForgotUsernamePage';
import ForgotPassword from './pages/ForgotPasswordPage';
import Register from './pages/RegisterPage';
import WhyRegister from './pages/WhyRegisterPage';
import UpdateProfile from './pages/UpdateProfilePage';
import Highlights from './pages/Highlights';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/matches' element={<MatchesPage />}></Route>
        <Route path='/matches/:id' element={<MatchDetailPage />}></Route>
        <Route path='/news' element={<NewsPage />}></Route>
        <Route path='/shop' element={<ShopPage></ShopPage>}></Route>
        <Route path='/shop/:id' element={<ProductDetailPage />}></Route>
        <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
        <Route path='/highlight' element={<Highlights></Highlights>}></Route>
      </Routes>
      <Footer />

      {/* <Home></Home> */}
      {/* <NewsPage></NewsPage> */}

      {/* <Hero />
      <LatestResults />
      <Standings />
      <ShopSection /> */}

      </div>
    </CartProvider>

  );
}

export default App;