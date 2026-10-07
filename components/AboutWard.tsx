
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Building, Info, Star } from 'lucide-react';
import { Language } from '../types.ts';

interface AboutWardProps {
  language: Language;
}

const AboutWard: React.FC<AboutWardProps> = ({ language }) => {
  const translations = {
    en: {
      tag: 'Information',
      title: 'About Ward No. 20',
      desc: 'Ward 20 is a vibrant hub of Vasai-Virar, encompassing residential clusters, educational centers, and upcoming infrastructure projects.',
      repTitle: 'Your Representative',
      stats: [
        { label: 'Population', value: '45,000+', icon: Users },
        { label: 'Area Covered', value: '12.5 sq.km', icon: MapPin },
        { label: 'Facilities', value: '24/7 Service', icon: Building },
        { label: 'Rating', value: 'Top Rated', icon: Star }
      ],
      details: [
        "Major residential neighborhoods including Achole and Nalasopara East sectors.",
        "Home to modern healthcare facilities and primary municipal schools.",
        "Dedicated grievance redressal cell for faster resolution of local issues.",
        "Upcoming park and playground projects under the 2024 development plan."
      ]
    },
    mr: {
      tag: 'माहिती',
      title: 'प्रभाग क्र. २० बद्दल',
      desc: 'प्रभाग २० हा वसई-विरारचा एक चैतन्यमय भाग आहे, ज्यामध्ये निवासी वसाहती, शैक्षणिक केंद्रे आणि आगामी पायाभूत सुविधा प्रकल्पांचा समावेश आहे.',
      repTitle: 'तुमचा प्रतिनिधी',
      stats: [
        { label: 'लोकसंख्या', value: '४५,०००+', icon: Users },
        { label: 'क्षेत्रफळ', value: '१२.५ चौ.किमी', icon: MapPin },
        { label: 'सुविधा', value: '२४/७ सेवा', icon: Building },
        { label: 'रेटिंग', value: 'सर्वोत्तम', icon: Star }
      ],
      details: [
        "अचोले आणि नालासोपारा पूर्व क्षेत्रांसह प्रमुख निवासी परिसर.",
        "आधुनिक आरोग्य सेवा सुविधा आणि प्राथमिक महानगरपालिका शाळांचे माहेरघर.",
        "स्थानिक समस्यांच्या जलद निराकरणासाठी समर्पित तक्रार निवारण कक्ष.",
        "२०२४ च्या विकास आराखड्यांतर्गत आगामी उद्यान आणि क्रीडांगण प्रकल्प."
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="about-ward" className="py-24 px-4 bg-[#FF9933] relative overflow-hidden border-t border-[#002147]/10">
      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 left-0 opacity-[0.03] pointer-events-none -translate-x-1/4 select-none">
        <div className="text-[20rem] font-black tracking-tighter text-[#002147]">BJP</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-[#FF9933] rounded-full text-xs font-black uppercase tracking-widest mb-6 ${language === 'mr' ? 'mukta' : ''}`}>
              <Info size={14} />
              {t.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl font-black text-[#002147] mb-6 tracking-tight ${language === 'mr' ? 'mukta' : ''}`}>
              {t.title}
            </h2>
            <p className={`text-xl text-[#002147]/70 font-medium mb-10 leading-relaxed ${language === 'mr' ? 'mukta text-2xl' : ''}`}>
              {t.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {t.stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 group hover:bg-white/60 transition-all duration-300 shadow-xl shadow-[#002147]/5">
                    <Icon size={24} className="text-[#002147] mb-3 group-hover:scale-110 transition-transform" />
                    <p className={`text-2xl font-black text-[#002147] mb-1 ${language === 'mr' ? 'mukta' : ''}`}>{stat.value}</p>
                    <p className={`text-xs font-bold text-[#002147]/50 uppercase tracking-widest ${language === 'mr' ? 'mukta' : ''}`}>{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <ul className="space-y-4">
              {t.details.map((detail, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#002147] flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF9933]"></div>
                  </div>
                  <p className={`text-[#002147]/80 font-medium ${language === 'mr' ? 'mukta text-lg' : ''}`}>{detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
             <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full"></div>
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative bg-[#002147] p-8 md:p-12 rounded-[3rem] text-center shadow-2xl border-4 border-white overflow-hidden"
             >
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Star size={120} className="text-[#FF9933]" />
               </div>
               
               <div className="relative z-10">
                  <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 rounded-full border-8 border-white/20 overflow-hidden shadow-2xl bg-white p-1">
                    <img 
                      src="https://tse4.mm.bing.net/th/id/OIP.FyI9klP_14_oL7W0U99IXAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
                      alt="Representative" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className={`text-[#FF9933] font-black uppercase tracking-[0.2em] text-xs mb-2 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.repTitle}
                  </p>
                  <h3 className={`text-3xl md:text-5xl font-black text-white mb-4 ${language === 'mr' ? 'mukta text-4xl' : ''}`}>
                    {language === 'mr' ? 'राजन नाईक' : 'Rajan Naik'} {/* UPDATED NAME */}
                  </h3>
                  <div className="h-1 w-20 bg-[#FF9933] mx-auto rounded-full mb-6"></div>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWard;
