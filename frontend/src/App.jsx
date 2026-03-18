import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/listings"    element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
