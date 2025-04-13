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
import ShoppingCart from './pages/CartPage';
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
        <Route path='/forgot-username' element={<ForgotUsername />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/why-register' element={<WhyRegister />}></Route>
        <Route path='/highlight' element={<Highlights></Highlights>}></Route>
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
      <Footer />

      {/* <Home></Home> */}
      {/* <NewsPage></NewsPage> */}

      {/* <Hero />
      <LatestResults />
      <Standings />
      <ShopSection /> */}

    </div>
  );
}

export default App;