
import React from 'react';
import { Language } from '../types.ts';

interface LatestUpdatesProps {
  language: Language;
}

const translations = {
  en: {
    badge: 'Update',
    news: [
      '📢 Property Tax deadline extended to March 31st, 2024. Pay online for 5% rebate.',
      '⚠️ Scheduled Water Cut: Ward No 4, 12, and 15 on Wednesday due to pipeline maintenance.',
      '✅ VVMC Marathon 2024 registrations are now open. Visit vvmcmarathon.com to register.'
    ]
  },
  mr: {
    badge: 'अपडेट',
    news: [
      '📢 मालमत्ता कराची मुदत ३१ मार्च २०२४ पर्यंत वाढवण्यात आली आहे. ५% सवलतीसाठी ऑनलाईन भरा.',
      '⚠️ पाणी कपात: पाईपलाईन दुरुस्तीमुळे बुधवारी प्रभाग क्र. ४, १२ आणि १५ मध्ये पाणी कपात असेल.',
      '✅ व्हीव्हीएमसी मॅरेथॉन २०२४ साठी नोंदणी सुरू आहे. नोंदणीसाठी vvmcmarathon.com ला भेट द्या.'
    ]
  }
};

const LatestUpdates: React.FC<LatestUpdatesProps> = ({ language }) => {
  const t = translations[language];
  return (
    <div className="bg-slate-900 text-white py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className={`whitespace-nowrap bg-[#FF9933] text-slate-900 px-3 py-1 rounded text-[10px] font-bold uppercase mr-4 tracking-widest shadow-[0_0_10px_rgba(255,153,51,0.4)] ${language === 'mr' ? 'mukta text-xs' : ''}`}>
          {t.badge}
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
          <div className="absolute flex whitespace-nowrap animate-marquee gap-12">
            {t.news.map((item, idx) => (
              <span key={idx} className={`text-sm font-medium ${language === 'mr' ? 'mukta' : ''}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LatestUpdates;
