
import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Language } from '../types.ts';

interface VVMCBlogProps {
  language: Language;
  onViewAll: () => void;
}

const VVMCBlog: React.FC<VVMCBlogProps> = ({ language, onViewAll }) => {
  const translations = {
    en: {
      title: "City News & Updates",
      subtitle: "Stay informed about the latest developments in your city.",
      viewAll: "View All News",
      readMore: "Read More",
      blogs: [
        {
          id: 1,
          title: "New E-Charging Stations Inaugurated in Virar West",
          excerpt: "BJP workers facilitate green energy with 10 new high-speed charging stations for public and private vehicles.",
          date: "Dec 12, 2023",
          image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600"
        },
        {
          id: 2,
          title: "Monsoon Preparedness: Drainage Cleaning Campaign",
          excerpt: "Municipal officials inspect ongoing desilting works across major arterial roads to ensure flood-free monsoon.",
          date: "Nov 28, 2023",
          image: "https://d3pc1xvrcw35tl.cloudfront.net/ln/images/1200x900/desilting-edited_202503898949.jpeg"
        },
        {
          id: 3,
          title: "Vasai Fort Heritage Walk: Preserving History",
          excerpt: "Tourism department organises weekend tours to educate youth about the rich historical significance of the region.",
          date: "Oct 15, 2023",
          image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/1d/68/e7.jpg"
        }
      ]
    },
    mr: {
      title: "शहर बातम्या आणि अपडेट्स",
      subtitle: "तुमच्या शहरातील ताज्या घडामोडींची माहिती मिळवा.",
      viewAll: "सर्व बातम्या पहा",
      readMore: "अधिक वाचा",
      blogs: [
        {
          id: 1,
          title: "विरार पश्चिममध्ये नवीन ई-चार्जिंग स्टेशनचे उद्घाटन",
          excerpt: "भाजप कार्यकर्त्यांच्या पुढाकाराने १० नवीन हाय-स्पीड चार्जिंग स्टेशनसह हरित उर्जेच्या दिशेने पाऊल टाकले आहे.",
          date: "१२ डिसेंबर, २०२३",
          image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600"
        },
        {
          id: 2,
          title: "मान्सूनची तयारी: ड्रेनेज सफाई मोहीम",
          excerpt: "पूरमुक्त मान्सून सुनिश्चित करण्यासाठी आयुक्तांनी प्रमुख रस्त्यांवरील सुरू असलेल्या गाळ काढण्याच्या कामांची पाहणी केली.",
          date: "२८ नोव्हेंबर, २०२३",
          image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=600"
        },
        {
          id: 3,
          title: "वसई किल्ला हेरिटेज वॉक: इतिहास जतन",
          excerpt: "पर्यटन विभाग तरुणांना या प्रदेशाच्या समृद्ध ऐतिहासिक महत्त्वाबद्दल शिक्षित करण्यासाठी शनिवार व रविवार सहली आयोजित करतो.",
          date: "१५ ऑक्टोबर, २०२३",
          image: "https://images.unsplash.com/photo-1624608309193-847248e59ec8?auto=format&fit=crop&q=80&w=600"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className="py-24 px-4 bg-[#FF9933] relative overflow-hidden">
      {/* Subtle Background Watermark */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-1/4 translate-x-1/4 select-none">
        <div className="text-[15rem] font-black tracking-tighter text-[#002147]">BJP</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className={`text-4xl md:text-5xl font-black text-[#002147] mb-4 tracking-tight ${language === 'mr' ? 'mukta' : ''}`}>
              {t.title}
            </h2>
            <p className={`text-lg text-[#002147]/70 font-medium max-w-2xl ${language === 'mr' ? 'mukta text-xl' : ''}`}>
              {t.subtitle}
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className={`flex items-center gap-2 text-[#002147] font-black hover:gap-4 transition-all bg-white/30 px-6 py-3 rounded-2xl border border-[#002147]/10 hover:bg-white/50 ${language === 'mr' ? 'mukta text-lg' : 'text-sm'}`}
          >
            {t.viewAll} <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {t.blogs.map(blog => (
            <article 
              key={blog.id} 
              onClick={onViewAll}
              className="group cursor-pointer bg-white/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] p-2 sm:p-4 border border-white/50 hover:bg-white/60 transition-all duration-300 shadow-xl shadow-[#002147]/5"
            >
              <div className="overflow-hidden rounded-[1.2rem] sm:rounded-[2rem] mb-3 sm:mb-6 aspect-[16/10]">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="px-1 sm:px-3 pb-2 sm:pb-4">
                <div className="flex items-center gap-1 sm:gap-2 text-[#002147]/50 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-4">
                  <Calendar size={12} className="text-[#002147] sm:w-[14px] sm:h-[14px]" />
                  {blog.date}
                </div>
                <h3 className={`text-xs sm:text-2xl font-black text-[#002147] mb-2 sm:mb-4 group-hover:text-black transition-colors leading-tight line-clamp-2 ${language === 'mr' ? 'mukta text-sm sm:text-2xl' : ''}`}>
                  {blog.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VVMCBlog;
