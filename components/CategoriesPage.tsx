
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Trash2, 
  Droplets, 
  Construction, 
  TreePine, 
  Dog, 
  TrafficCone, 
  AlertTriangle, 
  Volume2, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types.ts';

interface CategoriesPageProps {
  language: Language;
  onSelectCategory: (category: string) => void;
  onBack: () => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ language, onSelectCategory, onBack }) => {
  const t = {
    en: {
      title: 'Select Complaint Category',
      subtitle: 'Choose the department that best fits your issue for faster resolution.',
      back: 'Back to Home',
      categories: [
        { id: 'road', name: 'Road Complaint', icon: Construction, color: 'text-orange-600', bg: 'bg-orange-100' },
        { id: 'light', name: 'Street Light Complaint', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { id: 'garbage', name: 'Garbage / Waste Issue', icon: Trash2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { id: 'water', name: 'Water Leakage / Supply', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
        { id: 'toilet', name: 'Public Toilet Issue', icon: Droplets, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { id: 'tree', name: 'Fallen Tree / Trimming', icon: TreePine, color: 'text-green-600', bg: 'bg-green-100' },
        { id: 'animal', name: 'Stray Animal Issue', icon: Dog, color: 'text-amber-700', bg: 'bg-amber-100' },
        { id: 'traffic', name: 'Traffic Signal Issue', icon: TrafficCone, color: 'text-red-600', bg: 'bg-red-100' },
        { id: 'manhole', name: 'Open Manhole / Hazard', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-50' },
        { id: 'noise', name: 'Noise Pollution', icon: Volume2, color: 'text-slate-600', bg: 'bg-slate-100' }
      ]
    },
    mr: {
      title: 'तक्रारीचा प्रकार निवडा',
      subtitle: 'तुमच्या समस्येसाठी योग्य तो विभाग निवडा जेणेकरून त्याचे जलद निराकरण होईल.',
      back: 'मुख्यपृष्ठावर परत जा',
      categories: [
        { id: 'road', name: 'रस्ता तक्रार', icon: Construction, color: 'text-orange-600', bg: 'bg-orange-100' },
        { id: 'light', name: 'रस्त्यावरील दिवे', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { id: 'garbage', name: 'कचरा / सांडपाणी समस्या', icon: Trash2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { id: 'water', name: 'पाणी गळती / पुरवठा', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
        { id: 'toilet', name: 'सार्वजनिक शौचालय समस्या', icon: Droplets, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { id: 'tree', name: 'झाड पडणे / छाटणी', icon: TreePine, color: 'text-green-600', bg: 'bg-green-100' },
        { id: 'animal', name: 'भटके प्राणी समस्या', icon: Dog, color: 'text-amber-700', bg: 'bg-amber-100' },
        { id: 'traffic', name: 'ट्रॅफिक सिग्नल समस्या', icon: TrafficCone, color: 'text-red-600', bg: 'bg-red-100' },
        { id: 'manhole', name: 'उघडे मॅनहोल / धोका', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-50' },
        { id: 'noise', name: 'ध्वनी प्रदूषण', icon: Volume2, color: 'text-slate-600', bg: 'bg-slate-100' }
      ]
    }
  }[language];

  return (
    <div className="min-h-screen bg-[#FF9933] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#002147] font-black mb-12 bg-white/40 px-6 py-3 rounded-2xl backdrop-blur-md hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} />
          {t.back}
        </button>

        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-6xl font-black text-[#002147] mb-6 tracking-tighter ${language === 'mr' ? 'mukta' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-xl text-[#002147]/70 font-medium max-w-2xl mx-auto leading-relaxed ${language === 'mr' ? 'mukta text-2xl' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {t.categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectCategory(cat.name)}
                className="group cursor-pointer bg-white rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50"
              >
                <div className={`${cat.bg} p-5 rounded-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`${cat.color} w-8 h-8 md:w-10 md:h-10`} />
                </div>
                <h3 className={`text-sm md:text-lg font-black text-[#002147] leading-tight mb-4 ${language === 'mr' ? 'mukta' : ''}`}>
                  {cat.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
