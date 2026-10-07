
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Calendar, Clock, CheckCircle2, Circle, MapPin, FileText, Download, Loader2, AlertCircle, Activity } from 'lucide-react';
import { Language } from '../types.ts';

interface TrackingPageProps {
  language: Language;
  onBack: () => void;
}

const TrackingPage: React.FC<TrackingPageProps> = ({ language, onBack }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const t = {
    en: {
      title: 'Track Your Application',
      subtitle: 'Enter your Complaint ID to get real-time status updates.',
      placeholder: 'e.g. BJP-12345',
      btnTrack: 'Track Status',
      back: 'Back to Home',
      details: 'Complaint Details',
      id: 'Complaint ID',
      cat: 'Category',
      submitted: 'Submitted On',
      status: 'Current Status',
      lastUpdate: 'Last Updated',
      timeline: 'Tracking Timeline',
      download: 'Download Acknowledgment',
      notFound: 'Complaint ID not found. Please check and try again.',
      stages: [
        { label: 'Submitted', desc: 'Complaint successfully received by system.' },
        { label: 'In Verification', desc: 'Ward officer is verifying the site location.' },
        { label: 'Action Taken', desc: 'Department team dispatched for resolution.' },
        { label: 'Resolved', desc: 'Issue fixed and verified by supervisor.' }
      ]
    },
    mr: {
      title: 'तुमच्या अर्जाचा मागोवा घ्या',
      subtitle: 'रिअल-टाइम स्टेटस अपडेट मिळवण्यासाठी तुमचा तक्रार आयडी प्रविष्ट करा.',
      placeholder: 'उदा. BJP-१२३४५',
      btnTrack: 'स्थिती तपासा',
      back: 'मुख्यपृष्ठावर परत जा',
      details: 'तक्रारीचा तपशील',
      id: 'तक्रार आयडी',
      cat: 'श्रेणी',
      submitted: 'सादर केल्याची तारीख',
      status: 'सध्याची स्थिती',
      lastUpdate: 'शेवटचे अपडेट',
      timeline: 'ट्रॅकिंग टाइमलाइन',
      download: 'पावती डाउनलोड करा',
      notFound: 'तक्रार आयडी सापडला नाही. कृपया तपासा आणि पुन्हा प्रयत्न करा.',
      stages: [
        { label: 'सादर केले', desc: 'तक्रार यशस्वीरित्या सिस्टमद्वारे प्राप्त झाली.' },
        { label: 'पडताळणी सुरू', desc: 'प्रभाग अधिकारी जागेची पाहणी करत आहेत.' },
        { label: 'कार्यवाही सुरू', desc: 'निराकरणासाठी विभागाचे पथक रवाना झाले आहे.' },
        { label: 'निकाली काढले', desc: 'समस्या सोडवली गेली आणि पर्यवेक्षकाद्वारे पडताळली गेली.' }
      ]
    }
  }[language];

  const handleTrack = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/complaints/${query.trim()}`);
      
      if (response.status === 404) {
        setError(t.notFound);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch complaint details');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Tracking error:', err);
      setError(language === 'en' ? 'An error occurred while tracking. Please try again.' : 'ट्रॅकिंग करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF9933] pb-24">
      <div className="bg-[#002147] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Search size={160} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#FF9933] font-black mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={20} />
            {t.back}
          </button>
          <h1 className={`text-4xl md:text-6xl font-black mb-4 ${language === 'mr' ? 'mukta' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-lg text-white/70 font-medium ${language === 'mr' ? 'mukta text-xl' : ''}`}>
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                placeholder={t.placeholder}
                className="w-full pl-6 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#002147] focus:bg-white transition-all font-bold text-xl uppercase placeholder:normal-case placeholder:font-medium"
              />
            </div>
            <button 
              onClick={handleTrack}
              disabled={isSearching || !query.trim()}
              className="bg-[#002147] text-[#FF9933] px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
              {t.btnTrack}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold"
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                <div className="bg-[#002147] p-8 text-white flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-[#FF9933] uppercase tracking-widest mb-1">{t.id}</p>
                    <h2 className="text-3xl font-black">{result.id}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#FF9933] uppercase tracking-widest mb-1">{t.status}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9933] text-[#002147] rounded-full text-xs font-black">
                      <Activity size={12} />
                      {result.status}
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                        <FileText size={14} /> {t.details}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-slate-400 mb-1">{t.cat}</p>
                          <p className={`text-lg font-black text-[#002147] ${language === 'mr' ? 'mukta text-2xl' : ''}`}>{result.category}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 mb-1">{t.submitted}</p>
                          <p className="text-lg font-black text-[#002147]">{result.timestamp || result.submittedAt}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 mb-1">{t.lastUpdate}</p>
                          <p className="text-lg font-black text-[#002147]">{result.lastUpdate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Remark</p>
                      <p className={`text-[#002147] font-medium leading-relaxed ${language === 'mr' ? 'mukta text-lg' : ''}`}>
                        {result.remark}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-8">
                      <Clock size={14} /> {t.timeline}
                    </h3>
                    <div className="space-y-0 relative">
                      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                      {t.stages.map((stage, index) => {
                        const isCompleted = index <= (result.currentStep || 0);
                        const isCurrent = index === (result.currentStep || 0);
                        
                        return (
                          <div key={index} className="relative pl-10 pb-8 last:pb-0">
                            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${isCompleted ? 'bg-[#002147] text-[#FF9933]' : 'bg-slate-100 text-slate-300'}`}>
                              {isCompleted ? <CheckCircle2 size={14} /> : <Circle size={10} />}
                            </div>
                            <div>
                              <p className={`font-black text-sm uppercase tracking-wide ${isCompleted ? 'text-[#002147]' : 'text-slate-300'} ${isCurrent ? 'text-[#FF9933]' : ''}`}>
                                {stage.label}
                              </p>
                              <p className={`text-xs font-medium mt-1 ${isCompleted ? 'text-slate-500' : 'text-slate-300'} ${language === 'mr' ? 'mukta text-sm' : ''}`}>
                                {stage.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                  <button className="flex-grow py-4 bg-white border-2 border-slate-200 text-[#002147] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    <Download size={18} />
                    {t.download}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackingPage;
