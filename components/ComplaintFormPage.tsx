
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  ArrowLeft, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Activity,
  Navigation,
  Loader2,
  Image as ImageIcon,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types.ts';

interface ComplaintFormPageProps {
  language: Language;
  category: string;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const ComplaintFormPage: React.FC<ComplaintFormPageProps> = ({ language, category, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    landmark: '',
    priority: 'Medium',
    dateObserved: new Date().toISOString().split('T')[0],
    isDanger: false,
    frequency: 'One-time'
  });

  const [normalImage, setNormalImage] = useState<string | null>(null);
  const [geoImage, setGeoImage] = useState<string | null>(null);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalInputRef = useRef<HTMLInputElement>(null);
  const geoInputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      title: 'Submit Detailed Report',
      subtitle: 'Please provide accurate information for faster resolution.',
      catLabel: 'Category',
      mediaSection: 'Evidence Uploads',
      normalImg: 'Normal Photo (Required)',
      geoImg: 'Geo-tagged Photo (Required)',
      geoInfo: 'Coordinates will be embedded automatically',
      probSection: 'Problem Information',
      probTitle: 'Short Title',
      probDesc: 'Detailed Description (min 20 chars)',
      location: 'Exact Location',
      detectLoc: 'Detect Location',
      detecting: 'Locating...',
      landmark: 'Landmark (Optional)',
      priority: 'Priority Level',
      additional: 'Additional Logistics',
      dateObserved: 'Date Observed',
      danger: 'Is this causing immediate danger?',
      frequency: 'Frequency of Issue',
      submit: 'Submit Complaint',
      back: 'Back',
      valDesc: 'Description must be at least 20 characters.',
      valNormal: 'Normal image is mandatory.',
      valGeo: 'Geo-tagged image is mandatory.',
      valLoc: 'Location is required.',
      valTitle: 'Title is required.',
      placeholderTitle: 'e.g. Broken streetlight',
      placeholderDesc: 'Please describe the issue in detail...',
      placeholderLoc: 'Street name, Area name...',
      placeholderLandmark: 'Near ICICI Bank, Opposite Park...'
    },
    mr: {
      title: 'तपशीलवार तक्रार दाखल करा',
      subtitle: 'जलद निराकरणासाठी कृपया अचूक माहिती द्या.',
      catLabel: 'श्रेणी',
      mediaSection: 'पुरावा अपलोड करा',
      normalImg: 'सामान्य फोटो (आवश्यक)',
      geoImg: 'जिओ-टॅग केलेला फोटो (आवश्यक)',
      geoInfo: 'कोऑर्डिनेट्स स्वयंचलितपणे जोडले जातील',
      probSection: 'समस्येची माहिती',
      probTitle: 'थोडक्यात शीर्षक',
      probDesc: 'सविस्तर वर्णन (किमान २० अक्षरे)',
      location: 'अचूक ठिकाण',
      detectLoc: 'ठिकाण शोधा',
      detecting: 'शोधत आहे...',
      landmark: 'लँडमार्क (ऐच्छिक)',
      priority: 'प्राधान्य पातळी',
      additional: 'अतिरिक्त माहिती',
      dateObserved: 'पाहिलेली तारीख',
      danger: 'यामुळे तातडीचा ​​धोका निर्माण होत आहे का?',
      frequency: 'समस्येची वारंवारता',
      submit: 'तक्रार सबमिट करा',
      back: 'परत जा',
      valDesc: 'वर्णन किमान २० अक्षरांचे असावे.',
      valNormal: 'सामान्य फोटो अनिवार्य आहे.',
      valGeo: 'जिओ-टॅग फोटो अनिवार्य आहे.',
      valLoc: 'ठिकाण आवश्यक आहे.',
      valTitle: 'शीर्षक आवश्यक आहे.',
      placeholderTitle: 'उदा. रस्त्यावरील बंद दिवा',
      placeholderDesc: 'कृपया समस्येचे सविस्तर वर्णन करा...',
      placeholderLoc: 'रस्त्याचे नाव, परिसराचे नाव...',
      placeholderLandmark: 'ICICI बँके जवळ, उद्यानासमोर...'
    }
  }[language];

  const handleLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setFormData(prev => ({ ...prev, location: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}` }));
        setIsLocating(false);
      }, () => {
        // Fallback for demo
        setCoords({ lat: 19.3917, lng: 72.8397 });
        setFormData(prev => ({ ...prev, location: 'Vasai-Virar (Simulated Coords: 19.39, 72.83)' }));
        setIsLocating(false);
      });
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, type: 'normal' | 'geo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'normal') setNormalImage(reader.result as string);
        else {
          setGeoImage(reader.result as string);
          if (!coords) handleLocate();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = t.valTitle;
    if (formData.description.length < 20) newErrors.description = t.valDesc;
    if (!formData.location) newErrors.location = t.valLoc;
    if (!normalImage) newErrors.normalImage = t.valNormal;
    if (!geoImage) newErrors.geoImage = t.valGeo;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const complaintId = `BJP-${Math.floor(10000 + Math.random() * 90000)}`;
    const complaintData = {
      ...formData,
      category,
      id: complaintId,
      timestamp: new Date().toLocaleString(),
      images: { normal: !!normalImage, geo: !!geoImage, coords },
      status: 'Submitted',
      currentStep: 0,
      lastUpdate: new Date().toLocaleString(),
      remark: language === 'en' ? 'Complaint successfully received by system.' : 'तक्रार यशस्वीरित्या सिस्टमद्वारे प्राप्त झाली.'
    };

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaintData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      onSubmit(complaintData);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to submit. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF9933] pb-24 pt-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#002147] font-black mb-8 bg-white/40 px-6 py-3 rounded-2xl backdrop-blur-md hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} />
          {t.back}
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden mb-12">
          {/* Form Header */}
          <div className="bg-[#002147] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Navigation size={120} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9933] text-[#002147] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <CheckCircle2 size={12} />
                {t.catLabel}: {category}
              </div>
              <h1 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight ${language === 'mr' ? 'mukta' : ''}`}>
                {t.title}
              </h1>
              <p className={`text-white/60 font-medium ${language === 'mr' ? 'mukta text-xl' : ''}`}>
                {t.subtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleFinalSubmit} className="p-8 md:p-12 space-y-12">
            {/* 📸 Media Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-100">
                <ImageIcon className="text-[#002147]" size={24} />
                <h3 className={`text-xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.mediaSection}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Normal Image */}
                <div className="space-y-3">
                  <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.normalImg}
                  </label>
                  <div 
                    onClick={() => normalInputRef.current?.click()}
                    className={`relative h-48 rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${normalImage ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                  >
                    {normalImage ? (
                      <>
                        <img src={normalImage} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Trash2 className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <>
                        <Camera size={40} className="text-slate-300 mb-2" />
                        <span className="text-xs font-bold text-slate-400">Click to upload</span>
                      </>
                    )}
                  </div>
                  <input type="file" hidden ref={normalInputRef} accept="image/*" onChange={(e) => handleImage(e, 'normal')} />
                  {errors.normalImage && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.normalImage}</p>}
                </div>

                {/* Geo-Tagged Image */}
                <div className="space-y-3">
                  <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.geoImg}
                  </label>
                  <div 
                    onClick={() => geoInputRef.current?.click()}
                    className={`relative h-48 rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${geoImage ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                  >
                    {geoImage ? (
                      <>
                        <img src={geoImage} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Trash2 className="text-white" size={32} />
                        </div>
                        {coords && (
                          <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] text-white flex items-center gap-2">
                            <MapPin size={10} className="text-[#FF9933]" />
                            {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="bg-[#FF9933] p-3 rounded-2xl mb-2 shadow-lg">
                          <MapPin size={24} className="text-[#002147]" />
                        </div>
                        <span className="text-xs font-bold text-slate-400">Upload Geo-tagged Image</span>
                        <p className="text-[10px] text-slate-300 text-center mt-1 px-4">{t.geoInfo}</p>
                      </>
                    )}
                  </div>
                  <input type="file" hidden ref={geoInputRef} accept="image/*" onChange={(e) => handleImage(e, 'geo')} />
                  {errors.geoImage && <p className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.geoImage}</p>}
                </div>
              </div>
            </div>

            {/* 📝 Complaint Information */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-100">
                <Clock className="text-[#002147]" size={24} />
                <h3 className={`text-xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.probSection}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {/* Title */}
                <div className="space-y-3">
                  <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.probTitle}
                  </label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t.placeholderTitle}
                    className="w-full px-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg"
                  />
                  {errors.title && <p className="text-red-500 text-xs font-bold mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.probDesc}
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t.placeholderDesc}
                    className="w-full px-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg resize-none"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-xs font-bold mt-1">{errors.description}</p>}
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.location}
                  </label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={t.placeholderLoc}
                      className="flex-grow px-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg"
                    />
                    <button 
                      type="button"
                      onClick={handleLocate}
                      disabled={isLocating}
                      className="px-6 rounded-[1.5rem] bg-[#002147] text-[#FF9933] hover:bg-black transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg disabled:opacity-50"
                    >
                      {isLocating ? <Loader2 className="animate-spin" size={20} /> : <Navigation size={20} />}
                      <span className="hidden sm:inline font-black text-xs uppercase tracking-widest">{isLocating ? t.detecting : t.detectLoc}</span>
                    </button>
                  </div>
                  {errors.location && <p className="text-red-500 text-xs font-bold mt-1">{errors.location}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Landmark */}
                   <div className="space-y-3">
                    <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                      {t.landmark}
                    </label>
                    <input 
                      type="text" 
                      value={formData.landmark}
                      onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                      placeholder={t.placeholderLandmark}
                      className="w-full px-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg"
                    />
                  </div>

                  {/* Priority Level */}
                  <div className="space-y-3">
                    <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                      {t.priority}
                    </label>
                    <div className="flex p-1 bg-slate-100 rounded-[1.5rem] gap-1">
                      {['Low', 'Medium', 'High'].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, priority: level }))}
                          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${formData.priority === level ? (level === 'High' ? 'bg-red-500 text-white shadow-lg' : level === 'Medium' ? 'bg-[#002147] text-[#FF9933] shadow-lg' : 'bg-slate-400 text-white shadow-lg') : 'text-slate-400 hover:bg-white'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🗓 Additional Details */}
            <div className="space-y-8">
               <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-100">
                <Activity className="text-[#002147]" size={24} />
                <h3 className={`text-xl font-black text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.additional}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Date Picker */}
                <div className="space-y-3">
                   <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.dateObserved}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#002147]" size={20} />
                    <input 
                      type="date" 
                      value={formData.dateObserved}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateObserved: e.target.value }))}
                      className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg"
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-3">
                   <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.frequency}
                  </label>
                  <select 
                    value={formData.frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full px-6 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#002147] focus:bg-white outline-none transition-all font-bold text-lg appearance-none cursor-pointer"
                  >
                    <option value="One-time">One-time issue</option>
                    <option value="Repeated">Repeated (Frequent)</option>
                    <option value="Daily">Daily Problem</option>
                  </select>
                </div>

                {/* Danger Toggle */}
                <div className="space-y-3">
                   <label className={`text-sm font-black text-[#002147]/60 uppercase tracking-widest block ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                    {t.danger}
                  </label>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isDanger: !prev.isDanger }))}
                    className={`w-full py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 border-2 font-black text-xs uppercase tracking-widest ${formData.isDanger ? 'bg-red-50 border-red-500 text-red-600' : 'bg-slate-50 border-transparent text-slate-400'}`}
                  >
                    <AlertTriangle size={20} />
                    {formData.isDanger ? (language === 'en' ? 'Yes, Urgent' : 'हो, तातडीचे') : (language === 'en' ? 'No, Standard' : 'नाही')}
                  </button>
                </div>
              </div>
            </div>

            {/* Submission */}
            <div className="pt-8">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-[#002147] text-[#FF9933] rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl shadow-[#002147]/30 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={28} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={28} />
                    <span>{t.submit}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintFormPage;
