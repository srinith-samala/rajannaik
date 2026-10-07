
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, Timer, ArrowLeft, AlertCircle } from 'lucide-react';
import { Language } from '../types.ts';

interface AuthSectionProps {
  language: Language;
  onSuccess: () => void;
  isPageMode?: boolean;
}

const OTP_LENGTH = 6;
const RESEND_TIMER = 60;

const AuthSection: React.FC<AuthSectionProps> = ({ language, onSuccess, isPageMode = false }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [mobile, setMobile] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [demoOtp, setDemoOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const t = {
    en: {
      title: 'Citizen Authentication',
      subtitle: 'Official BJP Civic Connect Portal',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: '10-digit mobile number',
      getOtp: 'Get OTP',
      otpLabel: 'Verify OTP',
      otpDesc: 'We have sent a 6-digit code to',
      verifyBtn: 'Verify & Login',
      resend: 'Resend OTP',
      wait: 'Wait',
      sec: 's',
      errPhone: 'Please enter a valid 10-digit mobile number.',
      errOtp: 'Invalid OTP. Please check and try again.',
      back: 'Change Number',
      simulated: 'Simulated SMS Sent! Your OTP is: '
    },
    mr: {
      title: 'नागरिक प्रमाणीकरण',
      subtitle: 'अधिकृत BJP नागरी संपर्क पोर्टल',
      phoneLabel: 'मोबाईल नंबर',
      phonePlaceholder: '१०-अंकी मोबाईल नंबर',
      getOtp: 'ओटीपी मिळवा',
      otpLabel: 'ओटीपी सत्यापित करा',
      otpDesc: 'आम्ही ६-अंकी कोड पाठवला आहे: ',
      verifyBtn: 'सत्यापित करा आणि लॉगिन करा',
      resend: 'ओटीपी पुन्हा पाठवा',
      wait: 'थांबा',
      sec: 'सेकंद',
      errPhone: 'कृपया वैध १०-अंकी मोबाईल नंबर प्रविष्ट करा.',
      errOtp: 'अवैध ओटीपी. कृपया तपासा आणि पुन्हा प्रयत्न करा.',
      back: 'नंबर बदला',
      simulated: 'सिम्युलेटेड एसएमएस पाठवला! तुमचा ओटीपी आहे: '
    }
  }[language];

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = window.setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleSendOtp = async () => {
    setError('');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile)) {
      setError(t.errPhone);
      return;
    }

    setIsLoading(true);
    // Client-side demo OTP (works without a backend, e.g. on static hosting)
    await new Promise(r => setTimeout(r, 600));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(otp);
    setTimer(RESEND_TIMER);
    setStep('otp');
    setIsLoading(false);
    setTimeout(() => window.alert(t.simulated + otp), 100);
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (otpInput.length !== OTP_LENGTH) {
      setError(t.errOtp);
      return;
    }

    setIsLoading(true);
    // Demo mode: any 6-digit OTP is accepted
    await new Promise(r => setTimeout(r, 500));
    setIsLoading(false);
    onSuccess();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 w-full mx-auto max-w-lg ${isPageMode ? 'ring-8 ring-[#002147]/5' : ''}`}
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#FF9933] p-4 rounded-2xl text-[#002147] shadow-inner">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h3 className={`text-2xl md:text-3xl font-black text-[#002147] leading-none ${language === 'mr' ? 'mukta' : ''}`}>
            {t.title}
          </h3>
          <p className="text-slate-400 text-sm mt-1 font-medium">{t.subtitle}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'phone' ? (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <label className={`text-xs font-black text-[#002147] uppercase tracking-widest ml-1 ${language === 'mr' ? 'mukta' : ''}`}>
                {t.phoneLabel}
              </label>
              <div className="relative group">
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#FF9933] focus:bg-white transition-all font-bold text-xl tracking-wider"
                  value={mobile}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    setMobile(val);
                    if (error) setError('');
                  }}
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-xs font-bold flex items-center gap-1 ml-1"
                >
                  <AlertCircle size={12} />
                  {error}
                </motion.p>
              )}
            </div>

            <button 
              onClick={handleSendOtp}
              disabled={mobile.length !== 10 || isLoading}
              className={`w-full py-5 bg-[#002147] text-[#FF9933] rounded-[1.5rem] font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-[#002147]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${language === 'mr' ? 'mukta' : ''}`}
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={24} />
              ) : (
                <>
                  {t.getOtp}
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2 text-center">
              <h4 className={`text-xl font-bold text-[#002147] ${language === 'mr' ? 'mukta' : ''}`}>{t.otpLabel}</h4>
            </div>

            <div className="space-y-4">
              {demoOtp && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl text-center mb-4">
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-widest">
                    Demo Mode: Your OTP is <span className="text-lg text-[#002147] ml-1">{demoOtp}</span>
                  </p>
                </div>
              )}
              <input 
                type="text" 
                maxLength={OTP_LENGTH}
                placeholder="------"
                className="w-full py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-[#FF9933] focus:bg-white transition-all text-center text-4xl font-black tracking-[0.5em] text-[#002147]"
                value={otpInput}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  setOtpInput(val);
                  if (error) setError('');
                }}
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-500 text-xs font-bold flex items-center gap-1 justify-center"
                >
                  <AlertCircle size={12} />
                  {error}
                </motion.p>
              )}
            </div>

            <button 
              onClick={handleVerifyOtp}
              disabled={otpInput.length !== OTP_LENGTH || isLoading}
              className={`w-full py-5 bg-[#002147] text-[#FF9933] rounded-[1.5rem] font-black text-xl hover:bg-slate-800 transition-all shadow-xl shadow-[#002147]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${language === 'mr' ? 'mukta' : ''}`}
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={24} />
              ) : (
                <>
                  {t.verifyBtn}
                  <CheckCircle2 size={24} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthSection;
