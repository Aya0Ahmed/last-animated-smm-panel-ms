import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { ArrowRight, Star, Flame, Zap } from 'lucide-react';
import { TikTokIcon, InstagramIcon, YouTubeIcon, SnapchatIcon } from './BrandIcons';
import { motion } from 'framer-motion';

interface MostWantedProps {
  onPlaceOrder?: (platformId: string, categoryId: string, serviceId: string) => void;
}

const MostWanted: React.FC<MostWantedProps> = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handlePlaceOrder = (platformId: string, categoryId: string, serviceId: string) => {
      navigate('/new-order', {
          state: {
              prefill: { platformId, categoryId, serviceId }
          }
      });
  };

  const services = [
    {
      id: 'mw1',
      // @ts-ignore
      title: t('mw_title_1'),
      platformId: 'tiktok',
      categoryId: 'tt_views',
      serviceId: '101',
      price: '$0.50',
      unit: 'unit_per_1k',
      icon: TikTokIcon,
      gradient: 'from-cyan-400 to-cyan-600',
      bgGradient: 'from-cyan-500/20 to-cyan-600/20',
      badge: 'badge_viral',
      badgeIcon: Flame,
      badgeColor: 'bg-gradient-to-r from-cyan-500 to-cyan-400'
    },
    {
      id: 'mw2',
      // @ts-ignore
      title: t('mw_title_2'),
      platformId: 'instagram',
      categoryId: 'ig_followers',
      serviceId: '201',
      price: '$3.50',
      unit: 'unit_per_1k',
      icon: InstagramIcon,
      gradient: 'from-fuchsia-500 to-purple-600',
      bgGradient: 'from-fuchsia-500/20 to-purple-600/20',
      badge: 'badge_best',
      badgeIcon: Star,
      badgeColor: 'bg-gradient-to-r from-fuchsia-500 to-purple-600'
    },
    {
      id: 'mw3',
      // @ts-ignore
      title: t('mw_title_3'),
      platformId: 'youtube',
      categoryId: 'yt_subs',
      serviceId: '301',
      price: '$12.00',
      unit: 'unit_per_1k',
      icon: YouTubeIcon,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-500/20 to-red-600/20',
      badge: 'badge_prem',
      badgeIcon: Zap,
      badgeColor: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      id: 'mw4',
      // @ts-ignore
      title: t('mw_title_4'),
      platformId: 'snapchat',
      categoryId: 'sn_views',
      serviceId: '401',
      price: '$1.50',
      unit: 'unit_per_1k',
      icon: SnapchatIcon,
      gradient: 'from-yellow-400 to-amber-300',
      bgGradient: 'from-yellow-400/20 to-amber-300/20',
      badge: 'badge_hot',
      badgeIcon: Flame,
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      <div className="text-center space-y-6 mb-20 relative z-10">
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-[var(--text-muted)] text-sm font-bold mb-4 animate-bounce shadow-[0_0_20px_rgba(251,191,36,0.3)]"
        >
            <Star size={16} className="text-amber-500" fill="currentColor" />
            <span>TOP RATED SERVICES 2024</span>
            <Star size={16} className="text-amber-500" fill="currentColor" />
        </motion.div>
        <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] via-amber-200 to-orange-200 drop-shadow-[0_0_25px_rgba(251,191,36,0.4)] tracking-tight"
        >
          {t('mostWanted')}
        </motion.h2>
        <p className="text-[var(--text-muted)] text-2xl max-w-2xl mx-auto font-light leading-relaxed">
          {t('explorePopular')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
        {services.map((service, idx) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -20, rotateX: 5, rotateY: 5, scale: 1.02 }}
            onClick={() => handlePlaceOrder(service.platformId, service.categoryId, service.serviceId)}
            className="card-3d group relative glass-card rounded-[2.5rem] p-8 cursor-pointer overflow-hidden h-full min-h-[400px] flex flex-col justify-between border-[var(--glass-border)] hover:border-amber-500/50 shadow-xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r ${service.gradient} blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />

            <div className="absolute top-6 right-6 z-20">
              <span className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-lg ${service.badgeColor} animate-pulse`}>
                <service.badgeIcon size={12} />
                {/* @ts-ignore */}
                {t(service.badge)}
              </span>
            </div>

            <div className="card-content-3d relative z-10 mb-8">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`w-20 h-20 rounded-3xl bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-main)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-4 border-[var(--glass-border)] backdrop-blur-md`}
              >
                <service.icon width={48} height={48} className="drop-shadow-lg" />
              </motion.div>
            </div>

            <div className="card-content-3d relative z-10 space-y-3 mb-8">
              <h3 className="text-3xl font-black text-[var(--text-main)] leading-tight">
                {service.title}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-amber-500 drop-shadow-sm">{service.price}</span>
                {/* @ts-ignore */}
                <span className="text-sm text-[var(--text-muted)] font-medium tracking-wide uppercase">{t(service.unit)}</span>
              </div>
            </div>

            <div className="card-content-3d relative z-10 flex items-center justify-between pt-6 border-t border-[var(--glass-border)] group-hover:border-white/30 transition-colors mt-auto">
              <span className="text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors uppercase tracking-widest">
                {t('start_now')}
              </span>
              <motion.div 
                whileHover={{ x: 5, rotate: -45, scale: 1.1 }}
                className={`w-12 h-12 rounded-full glass-card flex items-center justify-center text-[var(--text-main)] group-hover:bg-[var(--text-main)] group-hover:text-[var(--bg-color)] transition-all duration-300 shadow-lg`}
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-24 relative rounded-[3rem] overflow-hidden glass-card border-[var(--glass-border)] shadow-2xl group card-3d"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80 z-0"></div>
        <motion.img 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1 }}
            src="https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1600&auto=format&fit=crop" 
            alt="Social Media Growth" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-[-1] mix-blend-overlay"
        />
        
        <div className="relative z-10 p-12 md:p-20 text-center flex flex-col items-center">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none drop-shadow-xl">
              SKYROCKET YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300">SOCIAL FAME</span>
            </h3>
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-medium">
                Don't wait for the algorithm. Take control and go viral today.
            </p>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlaceOrder('tiktok', 'tt_views', '101')}
                className="px-12 py-5 rounded-full bg-white text-orange-900 font-black text-xl hover:bg-amber-400 hover:text-black transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] flex items-center gap-3 group/btn"
            >
                {t('heroBtn')}
                <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MostWanted;