
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Zap, 
  Building2, 
  FileText, 
  UserCheck, 
  Baby, 
  Skull, 
  Store, 
  MessageSquareWarning, 
  Search, 
  Download, 
  LifeBuoy,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../types.ts';

interface ExploreServicesProps {
  language: Language;
  isCompact?: boolean;
  onViewAll?: () => void;
  onTrackClick?: () => void;
  onBack?: () => void;
}

const ExploreServices: React.FC<ExploreServicesProps> = ({ 
  language, 
  isCompact = true, 
  onViewAll, 
  onTrackClick,
  onBack 
}) => {
  const translations = {
    en: {
      tag: 'Digital Gateway',
      title: 'Explore Services',
      subtitle: isCompact ? 'Access essential services quickly.' : 'Access our complete catalog of municipal and public services.',
      viewAllBtn: 'View All Services',
      back: 'Back to Home',
      redirectMsg: 'Redirecting to secure service portal...',
      services: [
        { id: 'water', title: 'Water Bill Payment', desc: 'Pay your municipal water usage bills online.', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
        { id: 'elec', title: 'Electricity Bill Payment', desc: 'Settle power utility dues for your area.', icon: Zap, color: 'text-yellow-700', bg: 'bg-yellow-100' },
        { id: 'tax', title: 'Property Tax Payment', desc: 'Online portal for annual property tax assessment.', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-100' },
        { id: 'track_service', title: 'Track Issue / Complaint', desc: 'Check the real-time status of your submitted grievances.', icon: Search, color: 'text-sky-700', bg: 'bg-sky-100', isSpecial: true },
        { id: 'learn', title: 'Apply for Learning Licence', desc: 'Initial step for your road driving permit.', icon: FileText, color: 'text-emerald-700', bg: 'bg-emerald-100' },
        { id: 'drive', title: 'Driving Licence Services', desc: 'Renewal or new permanent driving licence.', icon: UserCheck, color: 'text-indigo-700', bg: 'bg-indigo-100' },
        { id: 'birth', title: 'Birth Certificate Services', desc: 'New registration or duplicate copy requests.', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-100' },
        { id: 'death', title: 'Death Certificate Services', desc: 'Issuance and correction of death records.', icon: Skull, color: 'text-slate-700', bg: 'bg-slate-100' },
        { id: 'trade', title: 'Trade / Business License', desc: 'Apply for or renew commercial permits.', icon: Store, color: 'text-violet-700', bg: 'bg-violet-100' },
        { id: 'grievance', title: 'Grievance Registration', desc: 'Official portal for non-emergency complaints.', icon: MessageSquareWarning, color: 'text-red-600', bg: 'bg-red-100' },
        { id: 'download', title: 'Download Certificates', desc: 'Get digitially signed municipal documents.', icon: Download, color: 'text-green-700', bg: 'bg-green-100' },
        { id: 'support', title: 'Citizen Help & Support', desc: 'Speak to a representative for guidance.', icon: LifeBuoy, color: 'text-amber-700', bg: 'bg-amber-100' }
      ]
    },
    mr: {
      tag: 'डिजिटल प्रवेशद्वार',
      title: 'सेवा शोधा',
      subtitle: isCompact ? 'महत्त्वाच्या सेवांमध्ये त्वरीत प्रवेश मिळवा.' : 'महानगरपालिका आणि सार्वजनिक सेवांच्या आमच्या संपूर्ण कॅटलॉगमध्ये प्रवेश करा.',
      viewAllBtn: 'सर्व सेवा पहा',
      back: 'मुख्यपृष्ठावर परत जा',
      redirectMsg: 'सुरक्षित सेवा पोर्टलवर निर्देशित करत आहे...',
      services: [
        { id: 'water', title: 'पाणी बिल पेमेंट', desc: 'तुमची महानगरपालिका पाणी वापर बिले ऑनलाईन भरा.', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
        { id: 'elec', title: 'वीज बिल पेमेंट', desc: 'तुमच्या भागातील वीज वापराचे देयके भरा.', icon: Zap, color: 'text-yellow-700', bg: 'bg-yellow-100' },
        { id: 'tax', title: 'मालमत्ता कर पेमेंट', desc: 'वार्षिक मालमत्ता कर मूल्यांकनासाठी ऑनलाईन पोर्टल.', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-100' },
        { id: 'track_service', title: 'तक्रार ट्रॅक करा', desc: 'तुमच्या सबमिट केलेल्या तक्रारींची रिअल-टाइम स्थिती तपासा.', icon: Search, color: 'text-sky-700', bg: 'bg-sky-100', isSpecial: true },
        { id: 'learn', title: 'लर्निंग लायसन्ससाठी अर्ज करा', desc: 'रस्ता ड्रायव्हिंग परमिटसाठी पहिली पायरी.', icon: FileText, color: 'text-emerald-700', bg: 'bg-emerald-100' },
        { id: 'drive', title: 'ड्रायव्हिंग लायसन्स सेवा', desc: 'नूतनीकरण किंवा नवीन कायमस्वरूपी ड्रायव्हिंग लायसन्स.', icon: UserCheck, color: 'text-indigo-700', bg: 'bg-indigo-100' },
        { id: 'birth', title: 'जन्म प्रमाणपत्र सेवा', desc: 'नवीन नोंदणी किंवा डुप्लिकेट प्रतीसाठी विनंती.', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-100' },
        { id: 'death', title: 'मृत्यू प्रमाणपत्र सेवा', desc: 'मृत्यू नोंदी जारी करणे आणि दुरुस्ती करणे.', icon: Skull, color: 'text-slate-700', bg: 'bg-slate-100' },
        { id: 'trade', title: 'व्यापार / व्यवसाय परवाना', desc: 'व्यावसायिक परवान्यासाठी अर्ज करा किंवा नूतनीकरण करा.', icon: Store, color: 'text-violet-700', bg: 'bg-violet-100' },
        { id: 'grievance', title: 'तक्रार नोंदणी', desc: 'बिगर-आपत्कालीन तक्रारींसाठी अधिकृत पोर्टल.', icon: MessageSquareWarning, color: 'text-red-600', bg: 'bg-red-100' },
        { id: 'download', title: 'प्रमाणपत्रे डाउनलोड करा', desc: 'डिजिटल स्वाक्षरी केलेली कागदपत्रे मिळवा.', icon: Download, color: 'text-green-700', bg: 'bg-green-100' },
        { id: 'support', title: 'नागरी मदत आणि समर्थन', desc: 'मार्गदर्शनासाठी प्रतिनिधीशी बोला.', icon: LifeBuoy, color: 'text-amber-700', bg: 'bg-amber-100' }
      ]
    }
  };

  const t = translations[language];
  const displayedServices = isCompact ? t.services.slice(0, 4) : t.services;

  const handleServiceAction = (service: any) => {
    if (service.id === 'track_service' && onTrackClick) {
      onTrackClick();
    } else {
      alert(`${t.redirectMsg} [${service.title}]`);
    }
  };

  return (
    <section 
      id="explore-services" 
      className={`py-24 px-4 ${!isCompact ? 'min-h-screen' : ''} bg-[#FF9933] relative overflow-hidden border-t border-[#002147]/5`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {!isCompact && onBack && (
          <div className="mb-12">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[#002147] font-black mb-8 hover:translate-x-[-4px] transition-transform bg-white/40 px-6 py-3 rounded-2xl backdrop-blur-md"
            >
              <ArrowLeft size={20} />
              {t.back}
            </button>
          </div>
        )}

        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-[#002147] text-[#FF9933] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg ${language === 'mr' ? 'mukta tracking-normal' : ''}`}>
            {t.tag}
          </div>
          <h2 className={`text-4xl md:text-5xl font-black text-[#002147] mb-4 tracking-tight ${language === 'mr' ? 'mukta' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-lg text-[#002147]/70 font-medium max-w-2xl mx-auto leading-relaxed ${language === 'mr' ? 'mukta text-xl' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <div className={`grid ${isCompact ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-6 lg:gap-8`}>
          {displayedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleServiceAction(service)}
                className="group cursor-pointer bg-white/40 backdrop-blur-md border border-white/50 p-5 sm:p-8 rounded-[2rem] hover:bg-white/70 hover:shadow-2xl hover:shadow-[#002147]/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className={`${service.bg} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ring-4 ring-white/30`}>
                  <Icon className={`${service.color} w-6 h-6 sm:w-8 sm:h-8`} />
                </div>
                
                <div className="flex-grow">
                  <h3 className={`text-sm sm:text-xl font-black text-[#002147] mb-2 sm:mb-3 leading-tight group-hover:text-blue-700 transition-colors ${language === 'mr' ? 'mukta text-lg' : ''}`}>
                    {service.title}
                  </h3>
                  <p className={`text-[10px] sm:text-sm text-[#002147]/60 font-medium leading-relaxed mb-6 line-clamp-2 ${language === 'mr' ? 'mukta' : ''}`}>
                    {service.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-black text-[#002147]/30 uppercase tracking-widest group-hover:text-[#002147] transition-all">
                  <span>Enter</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {isCompact && onViewAll && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={onViewAll}
              className={`group flex items-center gap-4 px-10 py-5 bg-[#002147] text-[#FF9933] rounded-[2rem] font-black text-xl hover:bg-black hover:scale-105 transition-all shadow-xl shadow-[#002147]/20 ${language === 'mr' ? 'mukta' : ''}`}
            >
              {t.viewAllBtn}
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreServices;
