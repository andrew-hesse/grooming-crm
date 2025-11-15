import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Core layout components (old design)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import GalleryPreview from "./components/Gallery";
import PriceList from "./components/PriceList";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileContactButtons from "./components/MobileContactButtons";
import ScrollToTop from "./components/ScrollToTop";
import StructuredData from "./components/StructuredData";

// Lazy-loaded pages to keep the landing bundle light
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const LegalNoticePage = lazy(() => import("./pages/LegalNoticePage"));
const CookiesPolicyPage = lazy(() => import("./pages/CookiesPolicyPage"));

const PageFallback = () => (
  <div className="py-24 text-center text-dark/70">Cargando contenido…</div>
);

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <GalleryPreview />
    <PriceList />
    <FAQ />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <StructuredData />
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<PageFallback />}>
          <main className="grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/galeria" element={<GalleryPage />} />
              <Route path="/reserva" element={<BookingPage />} />
              <Route path="/privacidad" element={<PrivacyPolicyPage />} />
              <Route path="/aviso-legal" element={<LegalNoticePage />} />
              <Route path="/politica-cookies" element={<CookiesPolicyPage />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
        <MobileContactButtons />
      </div>
    </Router>
  );
}

export default App;
