
import React from 'react';
import { motion } from "framer-motion";
import { Language } from '../types.ts';
import { translations } from '../translations.ts';

interface IntroScreenProps {
  onEnter: () => void;
  language: Language;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter, language }) => {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#FF9933] flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="text-[25rem] font-black select-none tracking-tighter text-[#002147]">BJP</div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 bg-white/70 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] text-center shadow-elevated border border-white/80 max-w-[95%] sm:max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative p-1.5 rounded-full bg-gradient-to-b from-[#FF9933] to-[#002147] shadow-2xl">
            <div className="bg-white rounded-full p-1">
               <img 
                src="/leader.jpeg" 
                alt="Representative" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-50"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-[#002147] rounded-2xl px-6 py-3 shadow-lg transform hover:scale-105 transition-transform border border-white/20">
            <span className="text-3xl font-black text-[#FF9933] italic tracking-tighter">BJP</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`text-3xl md:text-5xl font-black text-[#002147] mb-4 ${language === 'mr' ? 'mukta' : 'font-display'}`}
        >
          {t.namaste}
        </motion.p>

        <h1 className={`whitespace-nowrap text-[8vw] sm:text-4xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight mb-3 ${language === 'mr' ? 'mukta' : 'font-display'}`}>
          {t.brand}
        </h1>
        
        <p className={`font-bold text-[#002147]/70 text-base md:text-lg ${language === 'mr' ? 'mukta' : ''}`}>
          Connecting Vasai–Virar
        </p>
        
        <p className={`mt-3 text-xs md:text-sm text-slate-400 font-black uppercase tracking-[0.2em] ${language === 'mr' ? 'mukta tracking-normal' : ''}`}>
          {t.wardInfo}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="mt-10 bg-[#002147] text-[#FF9933] px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-[#002147]/20 hover:bg-black transition-all duration-300 w-full flex items-center justify-center gap-4 group"
        >
          <span className={language === 'mr' ? 'mukta' : ''}>{t.enterPortal}</span>
          <motion.span 
            animate={{ x: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-2xl"
          >
            → 
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
