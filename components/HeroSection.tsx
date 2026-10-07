
import React from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { Language } from '../types.ts';
import rajannaikImage from '../rajannaik.jpeg';

interface HeroSectionProps {
  language: Language;
  onReportClick: () => void;
  onTrackClick: () => void;
}

const translations = {
  en: {
    tag: 'Vasai • Virar • Nalasopara • Naigaon',
    title_1: 'Strong Vision.',
    title_2: 'Real Change.',
    desc: 'The Bharatiya Janata Party is committed to transforming our city with transparent governance and rapid development. Report issues directly to our ward teams.',
    btn_report: 'Report an Issue',
    btn_track: 'Track Issue',
    img_caption: 'Rajan Naik addressing the public regarding city development.', // UPDATED NAME
    highlightText: 'Bharatiya Janata Party (BJP) is a major political party in India. In the Vasai-Virar region, our workers are dedicated to the vision of a developed and safe city for all citizens.'
  },
  mr: {
    tag: 'वसई • विरार • नालासोपारा • नायगाव',
    title_1: 'मजबूत दृष्टी.',
    title_2: 'प्रत्यक्ष बदल.',
    desc: 'भारतीय जनता पार्टी पारदर्शक प्रशासन आणि जलद विकासासह आपल्या शहराचा कायापालट करण्यासाठी वचनबद्ध आहे.',
    btn_report: 'समस्या नोंदवा',
    btn_track: 'तक्रार ट्रॅक करा',
    img_caption: 'शहर विकासाबाबत जनतेला संबोधित करताना राजन नाईक.', // नाव अपडेट केले
    highlightText: 'भारतीय जनता पार्टी (भाजप) हा भारतातील एक प्रमुख राजकीय पक्ष आहे.'
  }
};

const HeroSection: React.FC<HeroSectionProps> = ({ language, onReportClick, onTrackClick }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden pt-16 pb-24 px-4 bg-[#FF9933]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* TEXT SECTION */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#002147] rounded-full shadow-lg text-[10px] uppercase tracking-widest font-black text-[#FF9933] mb-8">
            <MapPin size={12} />
            {t.tag}
          </div>

          <h1 className={`${language === 'mr' ? 'mukta text-6xl md:text-8xl' : 'text-5xl md:text-7xl'} font-black text-[#002147] mb-6 leading-[1.05] tracking-tighter`}>
            {t.title_1} <br />
            <span className="bg-white/30 px-2 rounded-lg">{t.title_2}</span>
          </h1>

          <p className={`${language === 'mr' ? 'mukta text-2xl' : 'text-xl'} text-[#002147]/80 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed`}>
            {t.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onReportClick}
              className="px-10 py-5 bg-[#002147] text-[#FF9933] rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl"
            >
              {t.btn_report}
            </button>

            <button
              onClick={onTrackClick}
              className="px-10 py-5 bg-white/40 backdrop-blur border border-[#002147]/20 rounded-2xl font-black text-lg"
            >
              {t.btn_track}
            </button>
          </div>
        </div>

        {/* IMAGE SECTION – FIXED */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute -z-10 inset-0 bg-white/20 blur-[120px] rounded-full"></div>

          <div className="relative rounded-[40px] overflow-hidden shadow-2xl ring-8 ring-white/50 bg-[#002147]">

            {/* Aspect Ratio Wrapper */}
            <div className="relative w-full aspect-[16/9]">
              <img
                src={rajannaikImage}
                alt="City Development"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className={`${language === 'mr' ? 'mukta text-lg' : 'text-sm font-bold uppercase tracking-wide'} text-white/90`}>
                {t.img_caption}
              </p>
            </div>
          </div>

          <div className="hidden lg:block mt-6 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-[#002147]/30 shadow-xl">
            <p className="text-[#002147] text-sm font-bold italic text-center">
              {t.highlightText}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
