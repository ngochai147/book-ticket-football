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
import Highlights from './pages/Highlights';
import { DataProvider } from './components/context/DataContext';
import BookMatchStepOne from './components/BookTicket/BookMatchStepOne';
import BookMatchStepTwo from './components/BookTicket/BookMatchStepTwo';
import BookMatchStepThree from './components/BookTicket/BookMatchStepThree';
import BookMatchStepFour from './components/BookTicket/BookMatchStepFour';
function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <DataProvider>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/matches' element={<MatchesPage />}></Route>
          <Route path='/matches/:id' element={<MatchDetailPage />}></Route>
          <Route path='/matches/bookticket/:id' element={<BookMatchStepOne/>}></Route>
          <Route path='/bookTwo' element={<BookMatchStepTwo/>}></Route>
          <Route path='/bookThree' element={<BookMatchStepThree></BookMatchStepThree>}></Route>
          <Route path='/bookFour' element={<BookMatchStepFour></BookMatchStepFour>}></Route>
          <Route path='/news' element={<NewsPage />}></Route>
          <Route path='/shop' element={<ShopPage></ShopPage>}></Route>
          <Route path='/shop/:id' element={<ProductDetailPage />}></Route>
          <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
          <Route path='/highlight' element={<Highlights></Highlights>}></Route>
        </Routes>
        <Footer />
      </DataProvider>

    </div>
  );
}

export default App;