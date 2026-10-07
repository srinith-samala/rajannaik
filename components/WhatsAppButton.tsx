
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types.ts';

interface WhatsAppButtonProps {
  language: Language;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ language }) => {
  return (
    <a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-200 hover:scale-110 hover:bg-green-600 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <div className={`absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-100 ${language === 'mr' ? 'mukta' : ''}`}>
        {language === 'en' ? 'BJP Helpline' : 'भाजप हेल्पलाईन'}
      </div>
    </a>
  );
};

export default WhatsAppButton;
