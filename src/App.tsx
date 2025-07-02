import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import TipsPage from "./pages/TipsPage";
import ContactUsPage from "./pages/ContactUsPage";
import TipsDetailPage from "./pages/TipsDetailPage";
import DetailProjectDecoration from "./pages/DetailProjectDecoration";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/bookings/BookingPage";
import DecorationList from "./pages/decoration/DecorationList";
import AuthGuard from "./components/AuthGuard";
import DecorationDetailPage from "./pages/decoration/DetailPackagePage";
import BookNowPage from "./pages/bookings/BookNowPage";
import { ToastContainer } from "react-toastify";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route
          path="/project-decorations/:id"
          element={<DetailProjectDecoration />}
        />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/tips/:id" element={<TipsDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/booking"
          element={
            <AuthGuard>
              <BookingPage />
            </AuthGuard>
          }
        />{" "}
        <Route path="/decorations" element={<DecorationList />} />
        <Route path="/decorations/:id" element={<DecorationDetailPage />} />
        <Route
          path="/book-now/:id"
          element={
            <AuthGuard>
              <BookNowPage />
            </AuthGuard>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <AuthGuard>
              <InvoicePage />
            </AuthGuard>
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
