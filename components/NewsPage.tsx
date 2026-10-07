
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Bookmark } from 'lucide-react';
import { Language } from '../types.ts';

interface NewsPageProps {
  language: Language;
  onBack: () => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ language, onBack }) => {
  const translations = {
    en: {
      title: 'Latest News & Events',
      back: 'Back to Home',
      featured: 'Featured Story',
      all: 'All Stories',
      news: [
        {
          id: 1,
          category: 'Infrastructure',
          title: 'Virar-Alibaug Multimodal Corridor Updates',
          date: 'Dec 15, 2023',
          image: 'https://imgeng.jagran.com/images/2024/12/28/article/image/expressway-1735381121456.webp',
          desc: 'High-level meeting held to discuss land acquisition and environmental impact assessments for the corridor project.'
        },
        {
          id: 2,
          category: 'Environment',
          title: 'Tree Plantation Drive at Jivdani Hills',
          date: 'Dec 10, 2023',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
          desc: 'Over 5000 saplings planted by local NGOs and volunteers to restore local biodiversity.'
        },
        {
          id: 3,
          category: 'Tech',
          title: 'Digital Ward: Smart Lighting Phase 1 Complete',
          date: 'Dec 05, 2023',
          image: 'https://alnasser.solutions/wp-content/uploads/2024/08/Smart-lighting.jpeg',
          desc: 'All main streets of Ward 20 now feature auto-dimming LED streetlights connected to a central control hub.'
        },
        {
          id: 4,
          category: 'Health',
          title: 'New Municipal Hospital Wing Opens',
          date: 'Nov 28, 2023',
          image: 'https://sportsmintmedia.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-14-at-12.20.42_85961f36.jpg',
          desc: 'A 50-bed pediatric ward with state-of-the-art facilities inaugurated in Vasai East.'
        }
      ]
    },
    mr: {
      title: 'ताज्या बातम्या आणि कार्यक्रम',
      back: 'मुख्यपृष्ठावर परत जा',
      featured: 'विशेष बातमी',
      all: 'सर्व बातम्या',
      news: [
        {
          id: 1,
          category: 'पायाभूत सुविधा',
          title: 'विरार-अलिबाग बहुउद्देशीय कॉरिडॉर अपडेट्स',
          date: '१५ डिसेंबर, २०२३',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
          desc: 'कॉरिडॉर प्रकल्पासाठी जमीन संपादन आणि पर्यावरणीय प्रभाव मूल्यांकनावर चर्चा करण्यासाठी उच्चस्तरीय बैठक संपन्न.'
        },
        {
          id: 2,
          category: 'पर्यावरण',
          title: 'जीवदानी डोंगरावर वृक्षारोपण मोहीम',
          date: '१० डिसेंबर, २०२३',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
          desc: 'स्थानिक जैवविविधता पुनर्संचयित करण्यासाठी स्थानिक स्वयंसेवी संस्था आणि स्वयंसेवकांद्वारे ५००० हून अधिक रोपांची लागवड.'
        },
        {
          id: 3,
          category: 'तंत्रज्ञान',
          title: 'डिजिटल प्रभाग: स्मार्ट लाइटिंगचा पहिला टप्पा पूर्ण',
          date: '०५ डिसेंबर, २०२३',
          image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800',
          desc: 'प्रभाग २० च्या सर्व मुख्य रस्त्यांवर आता सेंट्रल कंट्रोल हबला जोडलेले ऑटो-डिमिंन एलईडी दिवे बसवले आहेत.'
        },
        {
          id: 4,
          category: 'आरोग्य',
          title: 'नवीन महानगरपालिका रुग्णालय कक्षाचे उद्घाटन',
          date: '२८ नोव्हेंबर, २०२३',
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          desc: 'वसई पूर्व मध्ये अत्याधुनिक सुविधांनी सुसज्ज ५० खाटांच्या बालरोग विभागाचे उद्घाटन.'
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#002147] text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="text-[20rem] font-black -rotate-12 translate-y-1/2">BJP NEWS</div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#ffde00] font-black mb-10 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={20} />
            {t.back}
          </button>
          <h1 className={`text-5xl md:text-7xl font-black mb-6 ${language === 'mr' ? 'mukta' : ''}`}>
            {t.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {/* START: VIRAR-ALIBAUG CORRIDOR NEWS SECTION */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl md:text-4xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>
              {language === 'en' ? 'Virar-Alibaug Multimodal Corridor Updates' : 'विरार-अलिबाग बहुउद्देशीय कॉरिडॉर अपडेट्स'}
            </h2>
            <div className="h-1 flex-grow mx-6 bg-slate-200 rounded-full hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: language === 'en' ? 'Coastal Highway Progress' : 'कोस्टल हायवे प्रगती',
                img: 'https://english.cdn.zeenews.com/sites/default/files/2022/07/03/1060792-nh-17-highway.jpg'
              },
              {
                title: language === 'en' ? 'Expressway Bridge Design' : 'एक्स्प्रेस वे ब्रिज डिझाइन',
                img: 'https://i.ytimg.com/vi/hcwNDh3Wmqs/maxresdefault.jpg'
              },
              {
                title: language === 'en' ? 'Aerial Construction View' : 'हवाई बांधकाम दृश्य',
                img: 'https://files.propertywala.com/photos/6c/J291077511.aerial-view.62060l.jpg'
              },
              {
                title: language === 'en' ? 'Route Map & Planning' : 'मार्ग नकाशा आणि नियोजन',
                img: 'https://www.mumbaimetrotimes.com/wp-content/uploads/2023/02/Bhayander-Vasai-creek-bridge-Route-Map-1170x699.jpg'
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group h-80 rounded-[2rem] overflow-hidden shadow-lg cursor-pointer"
              >
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h4 className={`text-white font-black text-xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${language === 'mr' ? 'mukta' : ''}`}>
                    {card.title}
                  </h4>
                  <button className="bg-[#ffde00] text-[#002147] py-2 px-4 rounded-xl font-black text-sm self-start transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <a href="PASTE_YOUR_URL_HERE" target="_blank" rel="noopener noreferrer">
                      {language === 'en' ? 'Read More' : 'अधिक वाचा'}
                    </a>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        {/* END: VIRAR-ALIBAUG CORRIDOR NEWS SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {t.news.map((item, i) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row group"
              >
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#ffde00] text-[#002147] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                      <div className="flex gap-2">
                         <button className="p-2 text-slate-300 hover:text-[#002147]"><Share2 size={16} /></button>
                         <button className="p-2 text-slate-300 hover:text-[#002147]"><Bookmark size={16} /></button>
                      </div>
                    </div>
                    <h3 className={`text-2xl font-black text-[#002147] mb-4 ${language === 'mr' ? 'mukta text-3xl' : ''}`}>{item.title}</h3>
                    <p className={`text-slate-500 font-medium leading-relaxed mb-6 ${language === 'mr' ? 'mukta text-lg' : ''}`}>{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest pt-6 border-t border-slate-50">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="space-y-8">
            <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white shadow-2xl">
               <h4 className={`text-xl font-black mb-4 ${language === 'mr' ? 'mukta text-2xl' : ''}`}>
                 {language === 'en' ? 'News Categories' : 'बातम्यांचे प्रकार'}
               </h4>
               <div className="flex flex-wrap gap-2">
                  {['Civic', 'Events', 'Roads', 'Water', 'Health', 'Education'].map(c => (
                    <button key={c} className="bg-white/10 hover:bg-[#ffde00] hover:text-[#002147] px-4 py-2 rounded-xl text-sm font-bold transition-all">
                      {c}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
               <h4 className={`text-xl font-black text-[#002147] mb-6 ${language === 'mr' ? 'mukta text-2xl' : ''}`}>
                 {language === 'en' ? 'Trending Topics' : 'ट्रेंडिंग विषय'}
               </h4>
               <ul className="space-y-4">
                  {['Metro Line 9 Update', 'Monsoon Guidelines', 'Ward 20 Playground', 'BJP Membership'].map((t, i) => (
                    <li key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffde00]"></div>
                      <span className={`text-slate-600 font-bold group-hover:text-[#002147] transition-colors ${language === 'mr' ? 'mukta text-lg' : 'text-sm'}`}>{t}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
