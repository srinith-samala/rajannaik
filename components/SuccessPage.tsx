
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Share2, Download, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';
import { Language } from '../types.ts';

interface SuccessPageProps {
  language: Language;
  data: any;
  onHome: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ language, data, onHome }) => {
  const t = {
    en: {
      title: 'Report Submitted!',
      subtitle: 'Your complaint has been successfully registered in our system.',
      idLabel: 'Complaint ID',
      dateLabel: 'Submitted On',
      catLabel: 'Category',
      location: 'Location',
      msg: 'Our ward officers have been notified. You will receive SMS updates on your registered mobile number.',
      btnHome: 'Return to Home Dashboard',
      btnDownload: 'Download Copy',
      btnShare: 'Share Status'
    },
    mr: {
      title: 'तक्रार दाखल झाली!',
      subtitle: 'तुमची तक्रार आमच्या सिस्टममध्ये यशस्वीरित्या नोंदवली गेली आहे.',
      idLabel: 'तक्रार आयडी',
      dateLabel: 'सादर केल्याची तारीख',
      catLabel: 'श्रेणी',
      location: 'ठिकाण',
      msg: 'आमच्या प्रभाग अधिकाऱ्यांना सूचित करण्यात आले आहे. तुमच्या नोंदणीकृत मोबाईल नंबरवर तुम्हाला एसएमएस अपडेट मिळतील.',
      btnHome: 'होम डॅशबोर्डवर परत जा',
      btnDownload: 'प्रत डाउनलोड करा',
      btnShare: 'स्थिती शेअर करा'
    }
  }[language];

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#FF9933] flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-[3.5rem] shadow-2xl border-8 border-[#002147]/5 p-8 md:p-12 text-center"
      >
        <motion.div 
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-500/20"
        >
          <CheckCircle2 size={50} className="text-white" />
        </motion.div>

        <h1 className={`text-4xl md:text-5xl font-black text-[#002147] mb-4 tracking-tighter ${language === 'mr' ? 'mukta' : ''}`}>
          {t.title}
        </h1>
        <p className={`text-slate-400 font-medium mb-10 leading-relaxed ${language === 'mr' ? 'mukta text-xl' : ''}`}>
          {t.subtitle}
        </p>

        <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-10 space-y-8 text-left border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
             <CheckCircle2 size={120} className="text-[#002147]" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                 <Tag size={12} /> {t.idLabel}
              </p>
              <p className="text-2xl font-black text-[#002147] tracking-tight">{data.id}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                <Tag size={12} /> {t.catLabel}
              </p>
              <p className={`text-lg font-bold text-[#002147] ${language === 'mr' ? 'mukta text-2xl' : ''}`}>{data.category}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                <MapPin size={12} /> {t.location}
              </p>
              <p className={`text-sm font-bold text-[#002147] line-clamp-2 ${language === 'mr' ? 'mukta text-lg' : ''}`}>{data.location}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                <Calendar size={12} /> {t.dateLabel}
              </p>
              <p className="text-sm font-bold text-[#002147]">{data.timestamp}</p>
            </div>
          </div>
        </div>

        <p className={`text-slate-400 text-sm font-medium mb-10 italic ${language === 'mr' ? 'mukta' : ''}`}>
           {t.msg}
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={onHome}
            className="w-full py-5 bg-[#002147] text-[#FF9933] rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#002147]/20 active:scale-95"
          >
            <Home size={20} />
            {t.btnHome}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
