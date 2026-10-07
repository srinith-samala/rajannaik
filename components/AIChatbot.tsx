
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types.ts';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatbotProps {
  language: Language;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ language: initialLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLanguage, setChatLanguage] = useState<Language>('en');
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  const t = {
    en: {
      header: 'BJP Civic Assistant',
      online: 'AI Assistant Online',
      placeholder: 'Type your question...',
      welcome: "Namaste! I am your BJP AI Assistant. How can I help you today? You can ask me about reporting issues, emergency contacts, or information about Ward 20.",
      system: "You are a helpful AI assistant for the 'VVMC Civic Connect' portal of the Bharatiya Janata Party (BJP). Your goal is to help citizens of Vasai-Virar, specifically Ward No. 20. You can provide guidance on: 1. Reporting civic issues (potholes, garbage, water). 2. Finding emergency numbers. 3. Learning about local BJP initiatives. 4. Getting latest city news. Keep your responses concise, polite, and helpful. Use the language specified in the user prompt. If asked about reporting, remind them they need to register first if they haven't.",
      readMore: 'Read More',
      questions: [
        {
          q: "Do you want updates about Virar-Alibaug Multimodal Corridor?",
          a: "The Virar-Alibaug Multimodal Corridor is a major infrastructure project connecting the two cities. It will significantly reduce travel time and boost local economy.",
          link: "#"
        },
        {
          q: "Are you looking for political promotion services?",
          a: "We offer comprehensive political promotion services including social media management, ground campaigning, and digital outreach.",
          link: "#"
        },
        {
          q: "Do you want LED Screen Van advertising details?",
          a: "Our LED Screen Vans provide high-impact mobile advertising across Vasai-Virar, perfect for reaching a wide audience.",
          link: "#"
        },
        {
          q: "Do you want to register a public issue?",
          a: "You can register a public issue through our 'Report Issue' section. We track and address concerns like potholes, garbage, and water supply.",
          link: "#"
        },
        {
          q: "Do you want contact details of our team?",
          a: "You can find our team's contact details in the 'About Ward' section or by reaching out to our local office.",
          link: "#"
        }
      ]
    },
    mr: {
      header: 'BJP नागरी सहाय्यक',
      online: 'AI सहाय्यक ऑनलाइन',
      placeholder: 'तुमचा प्रश्न लिहा...',
      welcome: "नमस्कार! मी तुमचा BJP AI सहाय्यक आहे. मी तुम्हाला आज कशी मदत करू शकतो? तुम्ही मला तक्रार नोंदवणे, आपत्कालीन संपर्क किंवा प्रभाग २० बद्दल माहिती विचारू शकता.",
      system: "तुम्ही भारतीय जनता पार्टीच्या (BJP) 'VVMC Civic Connect' पोर्टलसाठी एक उपयुक्त AI सहाय्यक आहात. तुमचे ध्येय वसई-विरार, विशेषतः प्रभाग क्र. २० च्या नागरिकांना मदत करणे आहे. तुम्ही पुढील गोष्टींवर मार्गदर्शन करू शकता: १. नागरी समस्यांची तक्रार करणे (खड्डे, कचरा, पाणी). २. आपत्कालीन क्रमांक शोधणे. ३. स्थानिक भाजप उपक्रमांबद्दल जाणून घेणे. ४. शहराच्या ताज्या बातम्या मिळवणे. तुमची उत्तरे संक्षिप्त, सभ्य आणि उपयुक्त ठेवा. वापरकर्त्याने वापरलेली भाषा वापरा. तक्रार करण्याबद्दल विचारल्यास, त्यांना आठवण करून द्या की त्यांनी आधी नोंदणी करणे आवश्यक आहे.",
      readMore: 'अधिक वाचा',
      questions: [
        {
          q: "तुम्हाला विरार-अलिबाग मल्टीमोडल कॉरिडॉरची माहिती हवी आहे का?",
          a: "विरार-अलिबाग मल्टीमोडल कॉरिडॉर हा दोन शहरांना जोडणारा एक मोठा पायाभूत सुविधा प्रकल्प आहे. यामुळे प्रवासाचा वेळ लक्षणीयरीत्या कमी होईल आणि स्थानिक अर्थव्यवस्थेला चालना मिळेल.",
          link: "#"
        },
        {
          q: "तुम्हाला राजकीय प्रमोशन सेवा हवी आहे का?",
          a: "आम्ही सोशल मीडिया व्यवस्थापन, ग्राउंड कॅम्पेनिंग आणि डिजिटल आउटरीचसह सर्वसमावेशक राजकीय प्रमोशन सेवा देतो.",
          link: "#"
        },
        {
          q: "तुम्हाला LED स्क्रीन व्हॅन जाहिरातीची माहिती हवी आहे का?",
          a: "आमची LED स्क्रीन व्हॅन संपूर्ण वसई-विरारमध्ये उच्च-प्रभाव मोबाइल जाहिराती प्रदान करते, जी मोठ्या प्रेक्षकांपर्यंत पोहोचण्यासाठी योग्य आहे.",
          link: "#"
        },
        {
          q: "तुम्हाला सार्वजनिक तक्रार नोंदवायची आहे का?",
          a: "तुम्ही आमच्या 'तक्रार नोंदवा' विभागाद्वारे सार्वजनिक समस्या नोंदवू शकता. आम्ही खड्डे, कचरा आणि पाणीपुरवठा यांसारख्या समस्यांचा मागोवा घेतो आणि त्यांचे निराकरण करतो.",
          link: "#"
        },
        {
          q: "तुम्हाला आमच्या टीमशी संपर्क साधायचा आहे का?",
          a: "तुम्ही आमच्या टीमचे संपर्क तपशील 'प्रभाग बद्दल' विभागात किंवा आमच्या स्थानिक कार्यालयाशी संपर्क साधून मिळवू शकता.",
          link: "#"
        }
      ]
    }
  }[chatLanguage];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t.welcome }]);
    }
  }, [chatLanguage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleQuestionClick = (q: string, a: string) => {
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: q },
      { role: 'model', text: a }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!chatInstance.current) {
        chatInstance.current = genAI.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: t.system,
          }
        });
      }

      const stream = await chatInstance.current.sendMessageStream({ message: userMessage });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullText };
          return updated;
        });
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: chatLanguage === 'en' ? "I apologize, but I'm having trouble connecting right now. Please try again later." : "क्षमस्व, सध्या कनेक्ट होण्यात अडचण येत आहे. कृपया थोड्या वेळाने प्रयत्न करा." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 lg:bottom-6 lg:right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[88vw] sm:w-[400px] h-[600px] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,33,71,0.3)] border border-slate-100 flex flex-col overflow-hidden ring-8 ring-[#002147]/5 pointer-events-auto"
          >
            {/* START: AI SECTION */}
            <div className="bg-[#002147] p-5 flex items-center justify-between text-white relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF9933] rounded-xl flex items-center justify-center">
                  <Bot size={22} className="text-[#002147]" />
                </div>
                <div>
                  <h3 className={`font-black text-sm tracking-tight ${chatLanguage === 'mr' ? 'mukta text-lg' : ''}`}>{t.header}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <div className="bg-white/10 p-1 rounded-lg flex items-center">
                  <button 
                    onClick={() => setChatLanguage('en')}
                    className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${chatLanguage === 'en' ? 'bg-[#FF9933] text-[#002147]' : 'text-white/60 hover:text-white'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setChatLanguage('mr')}
                    className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${chatLanguage === 'mr' ? 'bg-[#FF9933] text-[#002147]' : 'text-white/60 hover:text-white'} mukta`}
                  >
                    मराठी
                  </button>
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#FF9933] text-[#002147]' : 'bg-[#002147] text-[#FF9933]'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed flex flex-col gap-3 ${
                      msg.role === 'user' 
                        ? 'bg-[#002147] text-white rounded-tr-none' 
                        : 'bg-white text-[#002147] shadow-sm border border-slate-100 rounded-tl-none'
                    } ${chatLanguage === 'mr' ? 'mukta text-base' : ''}`}>
                      {msg.text || (isLoading && idx === messages.length - 1 ? <Loader2 size={16} className="animate-spin" /> : '')}
                      
                      {/* Show Read More button for model responses that match our demo questions */}
                      {msg.role === 'model' && t.questions.some(q => q.a === msg.text) && (
                        <a 
                          href="#" 
                          target="_blank" 
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF9933] hover:underline mt-2"
                        >
                          {t.readMore} →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Interactive Questions */}
              <div className="pt-4 space-y-2">
                {t.questions.map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onClick={() => handleQuestionClick(item.q, item.a)}
                    className={`w-full text-left p-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-[#002147] hover:bg-slate-50 hover:shadow-md transition-all active:scale-[0.98] ${chatLanguage === 'mr' ? 'mukta text-sm' : ''}`}
                  >
                    {item.q}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* END: AI SECTION */}

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className={`w-full pl-5 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#FF9933] transition-all font-medium ${chatLanguage === 'mr' ? 'mukta' : ''}`}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#002147] text-[#FF9933] rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-[#002147] text-[#FF9933] rounded-full flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(0,33,71,0.4)] hover:scale-110 active:scale-95 transition-all group relative pointer-events-auto border-2 border-white/20"
        aria-label="AI Chat Assistant"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default AIChatbot;
