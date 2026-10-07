
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Language } from '../types.ts';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    en: {
      desc: "Official portal of the Bharatiya Janata Party (BJP) - Civic Connect. Dedicated to providing transparent and efficient civic services to our citizens.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      newsletter: "Newsletter",
      join: "Join",
      rights: "© 2024 Bharatiya Janata Party - Civic Connect. All Rights Reserved.",
      address: "BJP District Office, Vasai-Virar region, Dist. Palghar - 401305",
      officialWeb: "Official Website",
      links: ["Apply for Birth Certificate", "Pay Property Tax", "Building Plan Approval", "Trade License", "Tender Notifications"],
      policy: "Privacy Policy",
      terms: "Terms of Use",
      sitemap: "Sitemap"
    },
    mr: {
      desc: "भारतीय जनता पार्टी (भाजप) - नागरी संपर्कचे अधिकृत पोर्टल. आमच्या नागरिकांना पारदर्शक आणि कार्यक्षम नागरी सेवा प्रदान करण्यासाठी समर्पित.",
      quickLinks: "द्रुत दुवे",
      contactUs: "संपर्क साधा",
      newsletter: "वृत्तपत्र",
      join: "सामील व्हा",
      rights: "© २०२४ भारतीय जनता पार्टी - नागरी संपर्क. सर्व हक्क राखीव.",
      address: "भाजप जिल्हा कार्यालय, वसई-विरार क्षेत्र, जि. पालघर - ४०१३०५",
      officialWeb: "अधिकृत संकेतस्थळ",
      links: ["जन्म दाखल्यासाठी अर्ज करा", "मालमत्ता कर भरा", "इमारत आराखडा मंजुरी", "व्यापार परवाना", "निविदा सूचना"],
      policy: "गोपनीयता धोरण",
      terms: "वापराच्या अटी",
      sitemap: "साइटमॅप"
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF9933] rounded-xl flex items-center justify-center">
                <span className="text-lg font-black text-slate-900 italic">BJP</span>
              </div>
              <h2 className={`text-xl font-bold text-white ${language === 'mr' ? 'mukta' : ''}`}>BJP Civic</h2>
            </div>
            <p className={`text-sm leading-relaxed ${language === 'mr' ? 'mukta' : ''}`}>
              {t.desc}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF9933] hover:text-slate-900 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-white font-bold mb-6 ${language === 'mr' ? 'mukta' : ''}`}>{t.quickLinks}</h3>
            <ul className={`space-y-4 text-sm ${language === 'mr' ? 'mukta' : ''}`}>
              {t.links.map((link, idx) => (
                <li key={idx}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-white font-bold mb-6 ${language === 'mr' ? 'mukta' : ''}`}>{t.contactUs}</h3>
            <ul className={`space-y-4 text-sm ${language === 'mr' ? 'mukta' : ''}`}>
              <li className="flex gap-3">
                <MapPin size={18} className="text-[#FF9933] shrink-0" />
                <span>{t.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-[#FF9933] shrink-0" />
                <span>contact@bjp.org</span>
              </li>
              <li className="flex gap-3">
                <ExternalLink size={18} className="text-[#FF9933] shrink-0" />
                <a href="https://bjp.org" className="hover:text-white underline decoration-[#FF9933]/30">{t.officialWeb}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-white font-bold mb-6 ${language === 'mr' ? 'mukta' : ''}`}>{t.newsletter}</h3>
            <p className={`text-xs mb-4 leading-relaxed ${language === 'mr' ? 'mukta' : ''}`}>{language === 'en' ? 'Subscribe to get monthly civic updates and event notifications directly in your inbox.' : 'तुमच्या इनबॉक्समध्ये मासिक नागरी अपडेट्स आणि कार्यक्रम सूचना थेट मिळवण्यासाठी सबस्क्राइब करा.'}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={language === 'en' ? "Email address" : "ईमेल पत्ता"} 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-[#FF9933]"
              />
              <button className={`bg-[#FF9933] text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 transition-colors ${language === 'mr' ? 'mukta' : ''}`}>{t.join}</button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p className={language === 'mr' ? 'mukta' : ''}>{t.rights}</p>
          <div className={`flex gap-6 ${language === 'mr' ? 'mukta' : ''}`}>
            <a href="#" className="hover:text-white">{t.policy}</a>
            <a href="#" className="hover:text-white">{t.terms}</a>
            <a href="#" className="hover:text-white">{t.sitemap}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
