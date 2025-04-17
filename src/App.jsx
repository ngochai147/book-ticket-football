import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Header';
import ProductDetailPage from './components/Shop/ProductDetailPage';
import MatchDetailPage from './Matches/MatchDetailPage';
import NewsDetail from './news/NewsDetail';
import ShoppingCart from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ForgotUsername from './pages/ForgotUsernamePage';
import Highlights from './pages/Highlights';
import Home from './pages/Home';
import MatchesPage from './pages/MatchesPage';
import NewsPage from './pages/NewsPage';
import Register from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import UpdateProfile from './pages/UpdateProfilePage';
import WhyRegister from './pages/WhyRegisterPage';

import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext'; // Bạn nhớ import nếu có context này
import TicketHistoryPage from './pages/TicketHistoryPage';
// Các bước booking
import BookMatchStepFour from './BookTicket/BookMatchStepFour';
import BookMatchStepOne from './BookTicket/BookMatchStepOne';
import BookMatchStepThree from './BookTicket/BookMatchStepThree';
import BookMatchStepTwo from './BookTicket/BookMatchStepTwo';

function App() {
  return (
    <CartProvider>
      <DataProvider>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/matches' element={<MatchesPage />} />
            <Route path='/matches/:id' element={<MatchDetailPage />} />
            <Route path='/matches/bookticket/:id' element={<BookMatchStepOne />} />
            <Route path='/bookTwo' element={<BookMatchStepTwo />} />
            <Route path='/bookThree' element={<BookMatchStepThree />} />
            <Route path='/bookFour' element={<BookMatchStepFour />} />
            <Route path='/news' element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/shop/:id' element={<ProductDetailPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/forgot-username' element={<ForgotUsername />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/register' element={<Register />} />
            <Route path='/why-register' element={<WhyRegister />} />
            <Route path='/highlight' element={<Highlights />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/ticket-history" element={<TicketHistoryPage />} />
          </Routes>
          <Footer />
        </div>
      </DataProvider>
    </CartProvider>
  );
}

export default App;
