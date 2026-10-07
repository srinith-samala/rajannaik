
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "./components/IntroScreen.tsx";
import Header from "./components/Header.tsx";
import LatestUpdates from "./components/LatestUpdates.tsx";
import HeroSection from "./components/HeroSection.tsx";
import ExploreServices from "./components/ExploreServices.tsx";
import VVMCBlog from "./components/VVMCBlog.tsx";
import ReportIssueSection from "./components/ReportIssueSection.tsx";
import EmergencyNumbers from "./components/EmergencyNumbers.tsx";
import AboutWard from "./components/AboutWard.tsx";
import NewsPage from "./components/NewsPage.tsx";
import TrackingPage from "./components/TrackingPage.tsx";
import CategoriesPage from "./components/CategoriesPage.tsx";
import ComplaintFormPage from "./components/ComplaintFormPage.tsx";
import SuccessPage from "./components/SuccessPage.tsx";
import Footer from "./components/Footer.tsx";
import AIChatbot from "./components/AIChatbot.tsx";
import AuthSection from "./components/AuthSection.tsx";
import { Language } from "./types.ts";

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState<Language>('mr');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [showNewsPage, setShowNewsPage] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [showAllServicesPage, setShowAllServicesPage] = useState(false);
  const [showCategoriesPage, setShowCategoriesPage] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastComplaint, setLastComplaint] = useState<any>(null);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthPage(false);
    setShowCategoriesPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetPages = () => {
    setShowNewsPage(false);
    setShowTrackingPage(false);
    setShowAllServicesPage(false);
    setShowAuthPage(false);
    setShowCategoriesPage(false);
    setShowComplaintForm(false);
    setShowSuccessPage(false);
  };

  const handleReportClick = () => {
    resetPages();
    if (!isLoggedIn) {
      setShowAuthPage(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowCategoriesPage(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEmergencyClick = () => {
    resetPages();
    setTimeout(() => {
      const emergencySection = document.getElementById('emergency');
      if (emergencySection) {
        emergencySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAboutClick = () => {
    resetPages();
    setTimeout(() => {
      const aboutSection = document.getElementById('about-ward');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    resetPages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsClick = () => {
    resetPages();
    setShowNewsPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackClick = () => {
    resetPages();
    setShowTrackingPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllServices = () => {
    resetPages();
    setShowAllServicesPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setShowCategoriesPage(false);
    setShowComplaintForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplaintSubmit = (data: any) => {
    setLastComplaint(data);
    setShowComplaintForm(false);
    setShowSuccessPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900 bg-slate-50">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen 
            key="intro" 
            onEnter={() => setShowIntro(false)} 
            language={language}
          />
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="flex flex-col min-h-screen">
          <Header 
            language={language} 
            setLanguage={setLanguage} 
            onReportClick={handleReportClick}
            onHomeClick={handleHomeClick}
            onEmergencyClick={handleEmergencyClick}
            onAboutClick={handleAboutClick}
          />
          
          <AnimatePresence mode="wait">
            {showAuthPage ? (
              <motion.div
                key="auth-page"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex-grow flex items-center justify-center py-20 px-4 bg-[#FF9933]/10"
              >
                <div className="w-full max-w-xl">
                  <button 
                    onClick={() => setShowAuthPage(false)}
                    className="mb-8 flex items-center gap-2 text-[#002147] font-bold hover:underline"
                  >
                    ← {language === 'en' ? 'Back to Home' : 'मुख्यपृष्ठावर परत जा'}
                  </button>
                  <AuthSection 
                    language={language} 
                    onSuccess={handleAuthSuccess} 
                    isPageMode={true}
                  />
                </div>
              </motion.div>
            ) : showSuccessPage ? (
              <motion.div
                key="success-page"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-grow"
              >
                <SuccessPage 
                  language={language} 
                  data={lastComplaint} 
                  onHome={handleHomeClick} 
                />
              </motion.div>
            ) : showComplaintForm ? (
              <motion.div
                key="complaint-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-grow"
              >
                <ComplaintFormPage 
                  language={language} 
                  category={selectedCategory || ''} 
                  onBack={() => setShowCategoriesPage(true)} 
                  onSubmit={handleComplaintSubmit} 
                />
              </motion.div>
            ) : showCategoriesPage ? (
              <motion.div
                key="categories-page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-grow"
              >
                <CategoriesPage 
                  language={language} 
                  onSelectCategory={handleSelectCategory}
                  onBack={handleHomeClick}
                />
              </motion.div>
            ) : showNewsPage ? (
              <motion.div
                key="news-page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-grow"
              >
                <NewsPage language={language} onBack={handleHomeClick} />
              </motion.div>
            ) : showTrackingPage ? (
              <motion.div
                key="tracking-page"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex-grow"
              >
                <TrackingPage language={language} onBack={handleHomeClick} />
              </motion.div>
            ) : showAllServicesPage ? (
              <motion.div
                key="all-services-page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-grow"
              >
                <ExploreServices 
                  language={language} 
                  isCompact={false} 
                  onBack={handleHomeClick}
                  onTrackClick={handleTrackClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <main className="flex-grow">
                  <LatestUpdates language={language} />
                  <HeroSection 
                    language={language} 
                    onReportClick={handleReportClick} 
                    onTrackClick={handleTrackClick} 
                  />
                  <ExploreServices 
                    language={language} 
                    isCompact={true}
                    onViewAll={handleViewAllServices}
                    onTrackClick={handleTrackClick}
                  />
                  <AboutWard language={language} />
                  <VVMCBlog language={language} onViewAll={handleNewsClick} />
                  <ReportIssueSection 
                    language={language} 
                    isLoggedIn={isLoggedIn} 
                    onRequestAuth={() => setShowAuthPage(true)} 
                    initialCategory={selectedCategory}
                  />
                  <EmergencyNumbers language={language} />
                </main>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Footer language={language} />
          <AIChatbot language={language} />
        </div>
      )}
    </div>
  );
};

export default App;
