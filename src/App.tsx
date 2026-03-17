/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import WelcomePopup from './components/WelcomePopup';
import Home from './pages/Home';
import MobileNotaryServices from './pages/MobileNotaryServices';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import HospitalNotary from './pages/HospitalNotary';
import MobileLoanClosings from './pages/MobileLoanClosings';
import GeneralNotary from './pages/GeneralNotary';
import LenderDocuments from './pages/LenderDocuments';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import FAQPage from './pages/FAQPage';
import QuoteCalculator from './pages/QuoteCalculator';
import Resources from './pages/Resources';
import Booking from './pages/Booking';

// Resource Articles
import AcknowledgmentVsJurat from './pages/resources/AcknowledgmentVsJurat';
import AcceptableIdNc from './pages/resources/AcceptableIdNc';
import WhatIsMobileNotary from './pages/resources/WhatIsMobileNotary';

// New Service Pages
import PersonalDocuments from './pages/services/PersonalDocuments';
import BusinessDocuments from './pages/services/BusinessDocuments';
import FinancialDocuments from './pages/services/FinancialDocuments';
import LegalDocuments from './pages/services/LegalDocuments';
import RealEstateDocuments from './pages/services/RealEstateDocuments';
import SpecialConsiderations from './pages/services/SpecialConsiderations';
import MiscellaneousDocuments from './pages/services/MiscellaneousDocuments';
import HospitalsNursingHomes from './pages/services/HospitalsNursingHomes';
import LenderProvidedDocuments from './pages/services/LenderProvidedDocuments';

// Location Pages
import Charlotte from './pages/locations/Charlotte';
import Concord from './pages/locations/Concord';
import Gastonia from './pages/locations/Gastonia';
import Salisbury from './pages/locations/Salisbury';
import Monroe from './pages/locations/Monroe';
import Matthews from './pages/locations/Matthews';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mobile-notary-services" element={<MobileNotaryServices />} />
            
            {/* Detailed Service Pages */}
            <Route path="/services/personal-documents" element={<PersonalDocuments />} />
            <Route path="/services/business-documents" element={<BusinessDocuments />} />
            <Route path="/services/financial-documents" element={<FinancialDocuments />} />
            <Route path="/services/legal-documents" element={<LegalDocuments />} />
            <Route path="/services/real-estate-documents" element={<RealEstateDocuments />} />
            <Route path="/services/special-considerations" element={<SpecialConsiderations />} />
            <Route path="/services/miscellaneous-documents" element={<MiscellaneousDocuments />} />
            <Route path="/services/hospitals-nursing-homes" element={<HospitalsNursingHomes />} />
            <Route path="/services/lender-provided-documents" element={<LenderProvidedDocuments />} />

            {/* Location Pages */}
            <Route path="/locations/charlotte" element={<Charlotte />} />
            <Route path="/locations/concord" element={<Concord />} />
            <Route path="/locations/gastonia" element={<Gastonia />} />
            <Route path="/locations/salisbury" element={<Salisbury />} />
            <Route path="/locations/monroe" element={<Monroe />} />
            <Route path="/locations/matthews" element={<Matthews />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/acknowledgment-vs-jurat" element={<AcknowledgmentVsJurat />} />
            <Route path="/resources/acceptable-id-nc" element={<AcceptableIdNc />} />
            <Route path="/resources/what-is-mobile-notary" element={<WhatIsMobileNotary />} />
            <Route path="/calculator" element={<QuoteCalculator />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/services/hospital-notary" element={<HospitalNotary />} />
            <Route path="/services/mobile-loan-closings" element={<MobileLoanClosings />} />
            <Route path="/services/general-notary" element={<GeneralNotary />} />
            <Route path="/services/lender-documents" element={<LenderDocuments />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
        <WelcomePopup />
      </div>
    </Router>
  );
}
