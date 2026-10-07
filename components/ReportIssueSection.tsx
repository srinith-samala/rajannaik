
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, Sparkles, Loader2, Image as ImageIcon, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types.ts';

interface ReportProps {
  language: Language;
  isLoggedIn: boolean;
  onRequestAuth: () => void;
  initialCategory?: string | null;
}

const translations = {
  en: {
    tag: 'Help Your City',
    title: 'Report an Issue',
    to_muni: 'to the Municipality',
    desc: 'Spotted a problem in your ward? Upload a photo and describe the issue. Our team will verify and resolve it promptly.',
    smart: 'Smart Assist',
    smart_desc: 'Use our AI to automatically categorize and summarize your report for faster processing.',
    btn_ai: 'Analyze with AI Smart Assist',
    label_name: 'Your Name',
    label_phone: 'Contact Number *',
    label_cat: 'Issue Category *',
    label_desc: 'Description',
    label_photo: 'Upload Evidence (Optional)',
    btn_submit: 'Submit Report',
    success: 'Report submitted successfully!',
    placeholder_name: 'John Doe',
    placeholder_phone: '10-digit mobile',
    placeholder_desc: 'Describe the problem in detail...',
    cats: [
      'Road Complaint', 
      'Street Light Complaint', 
      'Garbage / Waste Issue', 
      'Water Leakage / No Water Supply', 
      'Public Toilet Issue', 
      'Fallen Tree / Tree Trimming', 
      'Stray Animal Issue', 
      'Traffic Signal Not Working', 
      'Open Manhole / Safety Hazard', 
      'Noise Pollution',
      'Other'
    ],
    auth_req_btn: 'Register to Report Issue'
  },
  mr: {
    tag: 'तुमच्या शहराला मदत करा',
    title: 'समस्या नोंदवा',
    to_muni: 'महानगरपालिकेकडे',
    desc: 'तुमच्या प्रभागात काही समस्या आढळली? फोटो अपलोड करा आणि समस्येचे वर्णन करा. आमचा संघ त्वरित पडताळणी करेल आणि त्याचे निराकरण करेल.',
    smart: 'स्मार्ट असिस्ट',
    smart_desc: 'वेगवान प्रक्रियेसाठी तुमची समस्या स्वयंचलितपणे वर्गीकृत करण्यासाठी आमचे AI वापरा.',
    btn_ai: 'AI स्मार्ट असिस्टसह विश्लेषण करा',
    label_name: 'तुमचे नाव',
    label_phone: 'संपर्क क्रमांक *',
    label_cat: 'समस्येचा प्रकार *',
    label_desc: 'वर्णन',
    label_photo: 'पुरावा अपलोड करा (ऐच्छिक)',
    btn_submit: 'तक्रार दाखल करा',
    success: 'तक्रार यशस्वीरित्या दाखल झाली!',
    placeholder_name: 'तुमचे नाव इथे लिहा',
    placeholder_phone: '१०-अंकी मोबाईल',
    placeholder_desc: 'समस्येचे सविस्तर वर्णन करा...',
    cats: [
      'रस्ता तक्रार', 
      'रस्त्यावरील दिवे', 
      'कचरा / सांडपाणी समस्या', 
      'पाणी गळती / पुरवठा', 
      'सार्वजनिक शौचालय समस्या', 
      'झाड पडणे / छाटणी', 
      'भटके प्राणी समस्या', 
      'ट्रॅफिक सिग्नल समस्या', 
      'उघडे मॅनहोल / धोका', 
      'ध्वनी प्रदूषण',
      'इतर'
    ],
    auth_req_btn: 'तक्रार करण्यासाठी नोंदणी करा'
  }
};

const ReportIssueSection: React.FC<ReportProps> = ({ language, isLoggedIn, onRequestAuth, initialCategory }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({ name: '', phone: '', category: '', description: '', });
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const analyzeIssueWithAI = async () => {
    if (!image && !formData.description) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [{ text: "Analyze this municipal issue. Suggest the best category. Context: Indian city municipal corp portal for Bharatiya Janata Party (BJP)." }];
      if (image) parts.push({ inlineData: { data: image.split(',')[1], mimeType: 'image/jpeg' } });
      if (formData.description) parts.push({ text: `User Description: ${formData.description}` });

      const response = await ai.models.generateContent({ 
        model: 'gemini-3-flash-preview', 
        contents: { parts } 
      });
      const resultText = response.text || "";
      setFormData(prev => ({ ...prev, description: `${prev.description}\n\n[AI]: ${resultText.slice(0, 300)}` }));
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsAnalyzing(false); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.phone) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', category: '', description: '' });
      setImage(null);
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <section id="report" className="py-24 px-4 bg-[#FF9933] relative overflow-hidden border-t border-[#002147]/10">
      <div className="absolute top-1/2 left-0 opacity-[0.03] pointer-events-none -translate-x-1/4 select-none">
        <div className="text-[18rem] font-black tracking-tighter text-[#002147]">BJP</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-[#FF9933] rounded-full text-xs font-black uppercase tracking-widest ${language === 'mr' ? 'mukta' : ''}`}>
              <Camera size={14} />
              {t.tag}
            </div>
            <h2 className={`text-5xl font-black text-[#002147] leading-[1.1] ${language === 'mr' ? 'mukta' : ''}`}>
              {t.title} <br/><span className="text-white underline decoration-white/30">{t.to_muni}</span>
            </h2>
            <p className={`text-xl text-[#002147]/80 font-medium leading-relaxed ${language === 'mr' ? 'mukta' : ''}`}>{t.desc}</p>
            
            {isLoggedIn && (
              <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-[#002147]/10">
                <h4 className={`font-black text-[#002147] mb-2 flex items-center gap-2 ${language === 'mr' ? 'mukta' : ''}`}>
                  <Sparkles size={18} className="text-[#002147]" />
                  {t.smart}
                </h4>
                <p className={`text-sm text-[#002147]/70 font-medium mb-6 ${language === 'mr' ? 'mukta' : ''}`}>{t.smart_desc}</p>
                <button
                  onClick={analyzeIssueWithAI}
                  disabled={isAnalyzing}
                  className={`flex items-center gap-2 text-sm font-black text-[#002147] hover:opacity-70 disabled:opacity-50 transition-all uppercase tracking-widest ${language === 'mr' ? 'mukta' : ''}`}
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                  {t.btn_ai}
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            {!isLoggedIn ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#002147] rounded-[3rem] p-12 text-center shadow-2xl shadow-[#002147]/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Lock size={120} className="text-[#FF9933]" />
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                    <Lock size={32} className="text-[#FF9933]" />
                  </div>
                  <h3 className={`text-3xl font-black text-white mb-4 ${language === 'mr' ? 'mukta' : ''}`}>
                    {language === 'en' ? 'Start Reporting' : 'तक्रार करण्यास सुरुवात करा'}
                  </h3>
                  <p className={`text-white/60 mb-8 max-w-xs mx-auto font-medium ${language === 'mr' ? 'mukta' : ''}`}>
                    {language === 'en' ? 'Create your official citizen account to track and manage your municipal grievances.' : 'तुमच्या नागरी तक्रारींचा मागोवा घेण्यासाठी तुमचे अधिकृत खाते तयार करा.'}
                  </p>
                  <button 
                    onClick={onRequestAuth}
                    className={`w-full py-5 bg-[#FF9933] text-[#002147] rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform ${language === 'mr' ? 'mukta' : ''}`}
                  >
                    {t.auth_req_btn}
                    <ArrowRight size={22} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#002147]/10 border border-white p-8 sm:p-10"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-black text-slate-400 uppercase tracking-widest ml-1 ${language === 'mr' ? 'mukta' : ''}`}>{t.label_name}</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t.placeholder_name} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#FF9933] focus:bg-white outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className={`w-full py-5 bg-[#002147] text-[#FF9933] rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-black shadow-xl shadow-[#002147]/20 active:scale-95 transition-all ${language === 'mr' ? 'mukta' : ''}`}>
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={22} />}
                    {t.btn_submit}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssueSection;
