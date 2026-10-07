
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '../types.ts';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onReportClick: () => void;
  onHomeClick: () => void;
  onEmergencyClick: () => void;
  onAboutClick: () => void;
}

const translations = {
  en: {
    home: 'Home',
    report: 'Report Issue',
    emergency: 'Emergency',
    aboutWard: 'About Ward',
    portal: 'Citizen Portal',
    vvmc: 'Bharatiya Janata',
    sub: 'Party • Civic Connect',
    leaderTitle: 'Hon. Leader',
    leaderName: 'Rajan Naik' // UPDATED NAME
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    report: 'समस्या नोंदवा',
    emergency: 'आपत्कालीन',
    aboutWard: 'प्रभागाबद्दल',
    portal: 'नागरिक पोर्टल',
    vvmc: 'भारतीय जनता',
    sub: 'पार्टी • नागरी संपर्क',
    leaderTitle: 'सन्माननीय नेते',
    leaderName: 'राजन नाईक' // नाव अपडेट केले
  }
};

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onReportClick, onHomeClick, onEmergencyClick, onAboutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-[#FF9933] border-b border-[#002147]/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-2">
        {/* Brand Section */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          onClick={onHomeClick}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#002147] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-lg sm:text-xl font-black text-[#FF9933] italic">BJP</span>
          </div>
          <div className="hidden sm:block">
            <h1 className={`${language === 'mr' ? 'mukta' : ''} text-lg font-black text-[#002147] leading-tight`}>{t.vvmc}</h1>
            <p className={`${language === 'mr' ? 'mukta text-[11px]' : 'text-[10px]'} font-bold text-[#002147]/70 uppercase tracking-tighter`}>{t.sub}</p>
          </div>
        </div>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-6">
          <button 
            onClick={onHomeClick}
            className={`text-sm font-black text-[#002147] hover:opacity-60 transition-opacity ${language === 'mr' ? 'mukta text-lg' : ''}`}
          >
            {t.home}
          </button>
          <button 
            onClick={onAboutClick}
            className={`text-sm font-black text-[#002147]/70 hover:text-[#002147] transition-all ${language === 'mr' ? 'mukta text-lg' : ''}`}
          >
            {t.aboutWard}
          </button>
          <button 
            onClick={onReportClick}
            className={`text-sm font-black text-[#002147]/70 hover:text-[#002147] transition-all ${language === 'mr' ? 'mukta text-lg' : ''}`}
          >
            {t.report}
          </button>
          <button 
            onClick={onEmergencyClick}
            className={`text-sm font-black text-[#002147]/70 hover:text-[#002147] transition-all ${language === 'mr' ? 'mukta text-lg' : ''}`}
          >
            {t.emergency}
          </button>
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Language Toggle */}
          <div className="flex bg-[#002147]/10 p-1 rounded-full border border-[#002147]/10 backdrop-blur-sm">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-black rounded-full transition-all flex items-center gap-1 ${language === 'en' ? 'bg-[#002147] text-[#FF9933] shadow-md' : 'text-[#002147] hover:bg-white/20'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('mr')}
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-black rounded-full transition-all flex items-center gap-1 ${language === 'mr' ? 'bg-[#002147] text-[#FF9933] shadow-md' : 'text-[#002147] hover:bg-white/20'}`}
            >
              मराठी
            </button>
          </div>

          {/* Top Right: Leader Photo Section */}
          <div className="flex flex-col items-center xl:items-end justify-center gap-1 border-l border-[#002147]/10 pl-2 sm:pl-4 min-w-[60px]">
             
             {/* // LEADER IMAGE – REPLACE URL HERE */}
             <div className="relative group cursor-pointer h-10 w-10 sm:h-11 sm:w-11">
                <div className="absolute inset-0 bg-[#002147] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="https://tse4.mm.bing.net/th/id/OIP.FyI9klP_14_oL7W0U99IXAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
                  alt="Leader Portrait" 
                  className="relative w-full h-full rounded-full border-2 border-[#002147] object-cover shadow-xl group-hover:scale-110 transition-transform"
                />
             </div>

             <div className="hidden xl:block text-right">
                <p className="text-[9px] font-black text-[#002147]/50 uppercase tracking-tighter leading-none mb-0.5">{t.leaderTitle}</p>
                <p className={`text-[11px] font-black text-[#002147] leading-none ${language === 'mr' ? 'mukta text-xs' : ''}`}>{t.leaderName}</p>
             </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-[#002147] hover:bg-[#002147]/5 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FF9933] border-b border-[#002147]/20 py-10 px-8 space-y-8 shadow-2xl animate-in slide-in-from-top duration-300">
          <button onClick={() => { onHomeClick(); setIsOpen(false); }} className={`block w-full text-left text-3xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.home}</button>
          <button onClick={() => { onAboutClick(); setIsOpen(false); }} className={`block w-full text-left text-3xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.aboutWard}</button>
          <button onClick={() => { onReportClick(); setIsOpen(false); }} className={`block w-full text-left text-3xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.report}</button>
          <button onClick={() => { onEmergencyClick(); setIsOpen(false); }} className={`block w-full text-left text-3xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.emergency}</button>
        </div>
      )}
    </header>
  );
};

export default Header;
