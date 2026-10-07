
import React from 'react';
import { Phone, ShieldAlert, Flame, Ambulance, Droplets, Zap, Siren, Users, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../types.ts';

interface EmergencyProps {
  language: Language;
}

const EmergencyNumbers: React.FC<EmergencyProps> = ({ language }) => {
  const translations = {
    en: {
      tag: '24/7 Support',
      title: 'Emergency Contacts',
      subtitle: 'Quick access to essential services and emergency responders.',
      cats: { critical: 'Critical', utility: 'Public Utility', social: 'Social' },
      names: ['Police Control Room', 'Fire Brigade', 'Ambulance Service', 'Disaster Management', 'Water Supply Dept', 'Electricity Dept', 'Women Helpline', 'Child Helpline']
    },
    mr: {
      tag: '२४/७ सहाय्यता',
      title: 'आपत्कालीन संपर्क',
      subtitle: 'जीवनावश्यक सेवा आणि आपत्कालीन प्रतिसादकर्त्यांपर्यंत त्वरित पोहोचा.',
      cats: { critical: 'गंभीर', utility: 'सार्वजनिक उपयुक्तता', social: 'सामाजिक' },
      names: ['पोलीस नियंत्रण कक्ष', 'अग्निशमन दल', 'रुग्णवाहिका सेवा', 'आपत्ती व्यवस्थापन', 'पाणी पुरवठा विभाग', 'विद्युत विभाग', 'महिला हेल्पलाईन', 'बाल हेल्पलाईन']
    }
  };

  const t = translations[language];
  const contacts = [
    { id: '1', name: t.names[0], number: '100', icon: Siren, category: t.cats.critical, color: 'bg-blue-600' },
    { id: '2', name: t.names[1], number: '101', icon: Flame, category: t.cats.critical, color: 'bg-red-600' },
    { id: '3', name: t.names[2], number: '108', icon: Ambulance, category: t.cats.critical, color: 'bg-green-600' },
    { id: '4', name: t.names[3], number: '0250-2334546', icon: ShieldAlert, category: t.cats.critical, color: 'bg-orange-600' },
    { id: '5', name: t.names[4], number: '0250-2332261', icon: Droplets, category: t.cats.utility, color: 'bg-cyan-600' },
    { id: '6', name: t.names[5], number: '1912', icon: Zap, category: t.cats.utility, color: 'bg-orange-500' },
    { id: '7', name: t.names[6], number: '1091', icon: Users, category: t.cats.social, color: 'bg-purple-600' },
    { id: '8', name: t.names[7], number: '1098', icon: Users, category: t.cats.social, color: 'bg-pink-600' },
  ];

  return (
    <section id="emergency" className="py-24 px-4 bg-[#FF9933] relative overflow-hidden border-t border-[#002147]/10">
      <div className="absolute top-1/2 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 select-none">
        <div className="text-[20rem] font-black tracking-tighter text-[#002147]">BJP</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-[#FF9933] rounded-full text-xs font-black uppercase tracking-widest mb-6 ${language === 'mr' ? 'mukta' : ''}`}>
            <Headset size={14} />
            {t.tag}
          </div>
          <h2 className={`text-4xl md:text-5xl font-black text-[#002147] mb-4 tracking-tight ${language === 'mr' ? 'mukta' : ''}`}>{t.title}</h2>
          <p className={`text-lg text-[#002147]/70 font-medium max-w-2xl mx-auto ${language === 'mr' ? 'mukta text-xl' : ''}`}>{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div 
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-8 border border-white/50 hover:bg-white/60 transition-all duration-300 shadow-xl shadow-[#002147]/5 flex flex-col items-center text-center group"
              >
                <div className={`${contact.color} p-3 sm:p-5 rounded-[1rem] sm:rounded-[1.5rem] text-white mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className={`text-sm sm:text-xl font-black text-[#002147] mb-4 sm:mb-6 leading-tight h-10 sm:h-14 flex items-center overflow-hidden line-clamp-2 ${language === 'mr' ? 'mukta text-base sm:text-2xl' : ''}`}>
                  {contact.name}
                </h3>
                <a 
                  href={`tel:${contact.number}`} 
                  className="flex items-center justify-center gap-2 sm:gap-3 w-full py-2.5 sm:py-4 bg-[#002147] text-[#FF9933] rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg hover:bg-black transition-colors shadow-lg active:scale-95"
                >
                  <Phone size={14} className="sm:w-[18px] sm:h-[18px]" />
                  {contact.number}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmergencyNumbers;
