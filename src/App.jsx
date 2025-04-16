import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchesPage from './pages/MatchesPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './components/Shop/ProductDetailPage';
import MatchDetailPage from './Matches/MatchDetailPage';
import ForgotUsername from './pages/ForgotUsernamePage';
import ForgotPassword from './pages/ForgotPasswordPage';
import Register from './pages/RegisterPage';
import WhyRegister from './pages/WhyRegisterPage';
import UpdateProfile from './pages/UpdateProfilePage';
import Highlights from './pages/Highlights';
import ShoppingCart from './pages/CartPage';

import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext'; // Bạn nhớ import nếu có context này
import TicketHistoryPage from './pages/TicketHistoryPage';
// Các bước booking
import BookMatchStepOne from './BookTicket/BookMatchStepOne';
import BookMatchStepTwo from './BookTicket/BookMatchStepTwo';
import BookMatchStepThree from './BookTicket/BookMatchStepThree';
import BookMatchStepFour from './BookTicket/BookMatchStepFour';

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
