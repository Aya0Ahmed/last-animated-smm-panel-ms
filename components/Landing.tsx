import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Rocket, Monitor, Headphones, DollarSign, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../App';
import { TikTokIcon, InstagramIcon, YouTubeIcon, SnapchatIcon, FacebookIcon, TelegramIcon } from './BrandIcons';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LandingProps {
  onNavigate?: (view: any) => void;
}

// Reusable Animated Section using Framer Motion
const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: delay / 1000, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const Landing: React.FC<LandingProps> = () => {
  const { t, dir } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Parallax Effect for Background Icons
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const bgOpacity = useTransform(scrollY, [300, 700], [0, 1]);
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const heroIcons = [
     { icon: TikTokIcon, color: '#000000', left: true, delay: 0 },
     { icon: YouTubeIcon, color: '#FF0000', right: true, delay: 0.1 },
     { icon: InstagramIcon, color: '#C13584', left: true, delay: 0.2 },
     { icon: SnapchatIcon, color: '#FFFC00', right: true, delay: 0.3 },
     { icon: FacebookIcon, color: '#1877F2', left: true, delay: 0.4 },
     { icon: TelegramIcon, color: '#29B6F6', right: true, delay: 0.5 },
  ];

  return (
    <div className={`font-sans overflow-x-hidden relative text-[var(--text-main)]`}>
      
      {/* Hero Side Icons (Fade out on scroll) */}
      <motion.div 
        style={{ opacity: heroOpacity, y: heroY }}
        className="fixed inset-0 z-10 pointer-events-none px-6 hidden md:block"
      >
          <div className="absolute top-[25%] left-8 lg:left-16 flex flex-col gap-16">
             {heroIcons.filter(i => i.left).map((item, i) => (
                <motion.div 
                    key={i} 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: item.delay, type: "spring" }}
                    className="hover:scale-110 transition-transform cursor-pointer"
                >
                    <item.icon width={72} height={72} className="drop-shadow-lg" />
                </motion.div>
             ))}
          </div>
          <div className="absolute top-[25%] right-8 lg:right-16 flex flex-col gap-16 items-end">
             {heroIcons.filter(i => i.right).map((item, i) => (
                <motion.div 
                    key={i} 
                    initial={{ x: 100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: item.delay, type: "spring" }}
                    className="hover:scale-110 transition-transform cursor-pointer"
                >
                    <item.icon width={72} height={72} className="drop-shadow-lg" />
                </motion.div>
             ))}
          </div>
      </motion.div>

      {/* Scattered Background Icons (Fade in on scroll) */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 pointer-events-none select-none"
      >
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-[15%] left-[5%] opacity-10"><TikTokIcon width={100} height={100} /></motion.div>
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 7, delay: 1 }} className="absolute top-[20%] right-[8%] opacity-10"><InstagramIcon width={120} height={120} /></motion.div>
          <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-[45%] left-[-2%] opacity-10 rotate-12"><YouTubeIcon width={140} height={140} /></motion.div>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute bottom-[40%] right-[2%] opacity-10 -rotate-12"><SnapchatIcon width={110} height={110} /></motion.div>
      </motion.div>

      <main className="relative z-20">
          <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 overflow-hidden rounded-[3rem] glass-card border-[var(--glass-border)] mx-4 mt-4">
              <div className="container max-w-5xl mx-auto text-center relative z-10">
                  <AnimatedSection>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-amber-500 text-sm font-semibold mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        #1 SMM Panel in Egypt & Worldwide
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={200}>
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--text-muted)] mb-4 tracking-widest uppercase">{t('heroTitle')}</h3>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tight text-[var(--text-main)] drop-shadow-xl">
                        {t('heroSubtitle')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300">
                            {t('heroDesc')}
                        </span>
                    </h1>
                  </AnimatedSection>

                  <AnimatedSection delay={400}>
                    <div className="max-w-xl mx-auto bg-black/40 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-[var(--glass-border)] flex flex-col md:flex-row gap-2 relative z-20">
                        <div className="flex-1 flex flex-col gap-2 p-2">
                            <input type="email" placeholder={t('heroFormPlaceholder1')} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder:text-white/30" />
                            <input type="password" placeholder={t('heroFormPlaceholder2')} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder:text-white/30" />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard')} 
                            className="bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold px-8 rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 md:w-auto py-4 md:py-0"
                        >
                            {t('heroBtn')} <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                        </motion.button>
                    </div>
                    <div className="mt-6 relative z-20">
                        <button onClick={() => navigate('/signup')} className="text-amber-400 hover:text-[var(--text-main)] text-sm underline decoration-dotted underline-offset-4 transition-colors">
                            {t('createAccount')}
                        </button>
                    </div>
                  </AnimatedSection>
              </div>
          </section>

          <section className="py-24 relative" id="services">
              <div className="container max-w-6xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
                      {[
                          { icon: Rocket, title: t('feature1Title'), desc: t('feature1Desc'), color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
                          { icon: DollarSign, title: t('feature2Title'), desc: t('feature2Desc'), color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                          { icon: Monitor, title: t('feature3Title'), desc: t('feature3Desc'), color: 'text-amber-500', bg: 'bg-amber-500/10' },
                          { icon: Headphones, title: t('feature4Title'), desc: t('feature4Desc'), color: 'text-orange-500', bg: 'bg-orange-500/10' }
                      ].map((feature, idx) => (
                          <AnimatedSection key={idx} delay={idx * 100} className="h-full">
                              <motion.div 
                                  whileHover={{ y: -10 }}
                                  className="h-full glass-card p-8 rounded-[2rem] hover:bg-[var(--glass-bg)] transition-all duration-300 group border-[var(--glass-border)]"
                              >
                                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                      <feature.icon size={32} />
                                  </div>
                                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-4">{feature.title}</h4>
                                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{feature.desc}</p>
                              </motion.div>
                          </AnimatedSection>
                      ))}
                  </div>
              </div>
          </section>

          <section className="py-32 relative" id="about">
              <div className="container max-w-6xl mx-auto px-6">
                  <div className="flex flex-col lg:flex-row items-center gap-20">
                      <div className="lg:w-1/2">
                          <AnimatedSection>
                              <div className="relative group perspective-container">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                                  <motion.div 
                                      whileHover={{ rotateY: 5, rotateX: 5 }}
                                      className="card-3d relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
                                  >
                                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" alt="About" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                  </motion.div>
                              </div>
                          </AnimatedSection>
                      </div>
                      <div className="lg:w-1/2">
                          <AnimatedSection delay={200}>
                              <h6 className="text-amber-500 font-bold uppercase tracking-widest mb-4 text-sm">{t('aboutTitle')}</h6>
                              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-8 leading-tight">{t('aboutHeading')}</h2>
                              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8 border-l-4 border-amber-500/50 pl-6">
                                  {t('aboutText')}
                              </p>
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/services')} 
                                className="inline-flex items-center gap-3 bg-[var(--text-main)] text-[var(--bg-color)] px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              >
                                  {t('viewAllServices')} <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                              </motion.button>
                          </AnimatedSection>
                      </div>
                  </div>
              </div>
          </section>

          <section className="py-20 border-y border-[var(--glass-border)] bg-black/10 backdrop-blur-sm">
              <div className="container max-w-6xl mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                          { num: "330+", label: t('counter1'), color: "text-cyan-500" },
                          { num: "850+", label: t('counter2'), color: "text-amber-500" },
                          { num: "25+", label: t('counter3'), color: "text-emerald-500" },
                          { num: "10+", label: t('counter4'), color: "text-orange-500" },
                      ].map((stat, idx) => (
                          <AnimatedSection key={idx} delay={idx * 100} className="text-center p-6 glass-card rounded-3xl border-[var(--glass-border)] hover:border-amber-500/30 hover:bg-[var(--glass-bg)] transition-all group">
                              <motion.div 
                                whileHover={{ scale: 1.2 }}
                                className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 drop-shadow-md`}
                              >
                                {stat.num}
                              </motion.div>
                              <div className="text-[var(--text-muted)] font-bold text-xs uppercase tracking-widest">{stat.label}</div>
                          </AnimatedSection>
                      ))}
                  </div>
              </div>
          </section>

          <section className="py-32 relative overflow-hidden">
              <div className="container max-w-4xl mx-auto px-6 relative z-10">
                  <AnimatedSection className="text-center mb-16">
                      <h6 className="text-amber-500 font-bold uppercase tracking-widest mb-4 text-sm">{t('faqTitle')}</h6>
                      <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)]">{t('faqHeading')}</h2>
                  </AnimatedSection>
                  <div className="space-y-4">
                      {[1, 2, 3, 4].map((num, idx) => (
                          <AnimatedSection key={num} delay={idx * 100}>
                              <motion.div 
                                layout
                                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === num ? 'bg-[var(--glass-bg)] border-amber-500/50 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'glass-card border-[var(--glass-border)] hover:border-amber-500/30'}`}
                              >
                                  <button onClick={() => toggleFaq(num)} className="w-full flex items-center justify-between p-6 text-left font-bold text-[var(--text-main)] text-lg">
                                      {/* @ts-ignore */}
                                      <span>{t(`faq${num}Q`)}</span>
                                      <div className={`p-2 rounded-full transition-colors ${openFaq === num ? 'bg-amber-500 text-white' : 'bg-[var(--glass-bg)] text-[var(--text-muted)]'}`}>
                                         {openFaq === num ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                      </div>
                                  </button>
                                  {openFaq === num && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-[var(--text-muted)] leading-relaxed border-t border-[var(--glass-border)] mt-2">
                                            {/* @ts-ignore */}
                                            <p>{t(`faq${num}A`)}</p>
                                        </div>
                                    </motion.div>
                                  )}
                              </motion.div>
                          </AnimatedSection>
                      ))}
                  </div>
              </div>
          </section>

          <footer className="border-t border-[var(--glass-border)] pt-20 pb-10 bg-[var(--glass-bg)] backdrop-blur-md mt-20 rounded-t-[3rem]">
               <div className="container max-w-6xl mx-auto px-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                       
                       <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass-card rounded-3xl border border-[var(--glass-border)] hover:border-amber-500/30 transition-colors group">
                           <div className="w-16 h-16 bg-[var(--glass-bg)] rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-[var(--glass-border)] group-hover:scale-110 transition-transform">
                               <MapPin size={32} />
                           </div>
                           <h6 className="font-bold text-[var(--text-main)] mb-2 text-xl">{t('footerAddress')}</h6>
                           <p className="text-[var(--text-muted)] text-sm">Online Services, Global</p>
                       </motion.div>

                       <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass-card rounded-3xl border border-[var(--glass-border)] hover:border-amber-500/30 transition-colors group">
                           <div className="w-16 h-16 bg-[var(--glass-bg)] rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-[var(--glass-border)] group-hover:scale-110 transition-transform">
                               <Mail size={32} />
                           </div>
                           <h6 className="font-bold text-[var(--text-main)] mb-2 text-xl">{t('footerPO')}</h6>
                           <p className="text-[var(--text-muted)] text-sm">support@nexus-smm.com</p>
                       </motion.div>

                       <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass-card rounded-3xl border border-[var(--glass-border)] hover:border-amber-500/30 transition-colors group">
                           <div className="w-16 h-16 bg-[var(--glass-bg)] rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 border border-[var(--glass-border)] group-hover:scale-110 transition-transform">
                               <Phone size={32} />
                           </div>
                           <h6 className="font-bold text-[var(--text-main)] mb-2 text-xl">{t('footerPhone')}</h6>
                           <p className="text-[var(--text-muted)] text-sm">+20 123 456 7890</p>
                       </motion.div>

                   </div>
                   <div className="text-center border-t border-[var(--glass-border)] pt-10">
                       <p className="text-[var(--text-muted)] text-sm">{t('copyright')}</p>
                   </div>
               </div>
          </footer>
      </main>
    </div>
  );
};

export default Landing;