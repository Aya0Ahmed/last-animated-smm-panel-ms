import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { Search } from 'lucide-react';
import { PlatformCategory, ServiceItem } from '../types';
import { TikTokIcon, InstagramIcon, YouTubeIcon, SnapchatIcon, FacebookIcon, TelegramIcon } from './BrandIcons';

interface ServicesProps {
  onPlaceOrder?: (platformId: string, categoryId: string, serviceId: string) => void; 
}

const Services: React.FC<ServicesProps> = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const platforms: PlatformCategory[] = [
    {
      id: 'tiktok',
      name: 'tiktok',
      icon: TikTokIcon,
      color: 'text-white',
      bg: 'bg-black/80',
      services: [
        { id: '101', categoryId: 'tt_views', nameKey: 'srv_101_name', rate: 0.50, min: 1000, max: 1000000, type: 'type_views' },
        { id: '102', categoryId: 'tt_views', nameKey: 'srv_102_name', rate: 1.20, min: 500, max: 500000, type: 'type_views_real' },
        { id: '103', categoryId: 'tt_likes', nameKey: 'srv_103_name', rate: 2.30, min: 100, max: 50000, type: 'type_likes' },
        { id: '104', categoryId: 'tt_followers', nameKey: 'srv_104_name', rate: 5.99, min: 100, max: 20000, type: 'type_followers' },
      ]
    },
    {
      id: 'instagram',
      name: 'instagram',
      icon: InstagramIcon,
      color: 'text-white',
      bg: 'bg-gradient-to-tr from-orange-500 to-fuchsia-600',
      services: [
        { id: '201', categoryId: 'ig_followers', nameKey: 'srv_201_name', rate: 3.50, min: 50, max: 100000, type: 'type_followers' },
        { id: '202', categoryId: 'ig_followers', nameKey: 'srv_202_name', rate: 8.00, min: 50, max: 50000, type: 'type_followers_prem' },
        { id: '203', categoryId: 'ig_likes', nameKey: 'srv_203_name', rate: 0.80, min: 50, max: 50000, type: 'type_likes' },
      ]
    },
    {
      id: 'youtube',
      name: 'youtube',
      icon: YouTubeIcon,
      color: 'text-white',
      bg: 'bg-red-600',
      services: [
        { id: '301', categoryId: 'yt_subs', nameKey: 'srv_301_name', rate: 12.00, min: 50, max: 5000, type: 'type_subs' },
        { id: '302', categoryId: 'yt_views', nameKey: 'srv_302_name', rate: 2.50, min: 500, max: 1000000, type: 'type_views' },
      ]
    },
    {
      id: 'snapchat',
      name: 'snapchat',
      icon: SnapchatIcon,
      color: 'text-black',
      bg: 'bg-yellow-400',
      services: [
        { id: '401', categoryId: 'sn_views', nameKey: 'srv_401_name', rate: 1.50, min: 1000, max: 1000000, type: 'type_views' },
      ]
    }
  ];

  const handleRowClick = (platform: PlatformCategory, item: ServiceItem) => {
    navigate('/new-order', { 
        state: { 
            prefill: {
                platformId: platform.id,
                categoryId: item.categoryId,
                serviceId: item.id
            }
        } 
    });
  };

  const filteredPlatforms = useMemo(() => {
    if (!searchTerm) return platforms;
    const term = searchTerm.toLowerCase();
    return platforms.map(platform => {
      // @ts-ignore
      const platformNameMatch = t(platform.name).toLowerCase().includes(term);
      const matchingServices = platform.services.filter(service => {
        // @ts-ignore
        const serviceName = t(service.nameKey).toLowerCase();
        // @ts-ignore
        const type = t(service.type).toLowerCase();
        return serviceName.includes(term) || type.includes(term);
      });
      if (platformNameMatch) return platform;
      return { ...platform, services: matchingServices };
    }).filter(p => p.services.length > 0);
  }, [searchTerm, t]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
            <h2 className="text-4xl font-bold text-[var(--text-main)]">{t('services')}</h2>
            <p className="text-[var(--text-muted)] mt-1">{t('checkPricing')}</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-amber-500 transition-colors" size={20} />
            <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="pl-12 rtl:pr-12 rtl:pl-4 pr-4 py-3.5 glass-input rounded-2xl text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 w-full transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {filteredPlatforms.length > 0 ? (
        filteredPlatforms.map((platform) => (
          <div key={platform.id} className="space-y-4">
            
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${platform.bg} shadow-lg backdrop-blur-sm`}>
                <platform.icon width={28} height={28} className="drop-shadow-sm" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-main)]">
                {/* @ts-ignore */}
                {t(platform.name)}
              </h3>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden shadow-xl border-[var(--glass-border)]">
              <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right border-collapse">
                      <thead>
                          <tr className="border-b border-[var(--glass-border)] text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest bg-[var(--glass-bg)]">
                              <th className="p-5 w-20 text-center">{t('id')}</th>
                              <th className="p-5">{t('service')}</th>
                              <th className="p-5 w-40">{t('rate')}</th>
                              <th className="p-5 w-48">{t('minmax')}</th>
                              <th className="p-5 w-40">{t('category')}</th>
                          </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-[var(--glass-border)]">
                          {platform.services.map((service, index) => (
                              <tr 
                                key={service.id} 
                                onClick={() => handleRowClick(platform, service)}
                                className="hover:bg-[var(--glass-bg)] transition-colors cursor-pointer group"
                              >
                                  <td className="p-5 text-center">
                                    <span className="font-mono text-[var(--text-muted)] text-xs bg-[var(--glass-bg)] px-2 py-1 rounded-md border border-[var(--glass-border)]">
                                      {service.id}
                                    </span>
                                  </td>
                                  <td className="p-5 font-bold text-[var(--text-main)] group-hover:text-amber-500 transition-colors text-base">
                                    {/* @ts-ignore */}
                                    {t(service.nameKey)}
                                  </td>
                                  <td className="p-5">
                                    <span className="font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-xs shadow-sm border border-emerald-500/20">
                                      ${service.rate.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="p-5 text-[var(--text-muted)] text-xs font-mono">
                                    {service.min.toLocaleString()} / {service.max.toLocaleString()}
                                  </td>
                                  <td className="p-5">
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)]`}>
                                          {/* @ts-ignore */}
                                          {t(service.type)}
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-[var(--text-muted)] glass-card rounded-3xl border-dashed border-2 border-[var(--glass-border)]">
          <Search size={56} className="mb-4 opacity-50 animate-pulse" />
          <p className="text-xl font-medium">{t('noServicesFound')} "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Services;