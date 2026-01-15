import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from '../App';
import { PlatformOption, OrderPrefillData } from '../types';
import { ChevronDown, CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';
import { TikTokIcon, InstagramIcon, YouTubeIcon, SnapchatIcon } from './BrandIcons';

interface NewOrderProps {
  prefillData?: OrderPrefillData | null;
}

const NewOrder: React.FC<NewOrderProps> = ({ prefillData: propPrefill }) => {
  const { t } = useContext(LanguageContext);
  const location = useLocation();
  
  const prefillData = propPrefill || (location.state as any)?.prefill as OrderPrefillData;

  const platformsData: PlatformOption[] = [
    {
      id: 'tiktok',
      // @ts-ignore
      name: t('pl_tiktok'),
      icon: TikTokIcon,
      categories: [
        {
          id: 'tt_views',
          // @ts-ignore
          name: t('cat_views'),
          services: [
            { id: '101', name: t('srv_101_name'), rate: 0.50, min: 1000, max: 1000000, description: t('srv_101_desc') },
            { id: '102', name: t('srv_102_name'), rate: 1.20, min: 500, max: 500000, description: t('srv_102_desc') }
          ]
        },
        {
          id: 'tt_likes',
          // @ts-ignore
          name: t('cat_likes'),
          services: [
            { id: '103', name: t('srv_103_name'), rate: 2.30, min: 100, max: 50000, description: t('srv_103_desc') }
          ]
        }
      ]
    },
    {
      id: 'instagram',
      // @ts-ignore
      name: t('pl_instagram'),
      icon: InstagramIcon,
      categories: [
        {
          id: 'ig_followers',
          // @ts-ignore
          name: t('cat_followers'),
          services: [
             { id: '201', name: t('srv_201_name'), rate: 3.50, min: 50, max: 100000, description: t('srv_201_desc') },
             { id: '202', name: t('srv_202_name'), rate: 8.00, min: 50, max: 50000, description: t('srv_202_desc') }
          ]
        }
      ]
    },
    {
      id: 'youtube',
      // @ts-ignore
      name: t('pl_youtube'),
      icon: YouTubeIcon,
      categories: [
        {
          id: 'yt_subs',
          // @ts-ignore
          name: t('cat_subs'),
          services: [
            { id: '301', name: t('srv_301_name'), rate: 12.00, min: 50, max: 5000, description: t('srv_301_desc') }
          ]
        }
      ]
    },
    {
      id: 'snapchat',
      // @ts-ignore
      name: t('pl_snapchat'),
      icon: SnapchatIcon,
      categories: [
          {
            id: 'sn_views',
            // @ts-ignore
            name: t('cat_story'),
            services: [
                 { id: '401', name: t('srv_401_name'), rate: 1.50, min: 1000, max: 1000000, description: t('srv_401_desc') }
            ]
          }
      ]
    }
  ];

  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (prefillData) setSelectedPlatformId(prefillData.platformId);
  }, [prefillData]);

  useEffect(() => {
    if (prefillData && selectedPlatformId === prefillData.platformId) setSelectedCategoryId(prefillData.categoryId);
  }, [selectedPlatformId, prefillData]);

  useEffect(() => {
    if (prefillData && selectedCategoryId === prefillData.categoryId) setSelectedServiceId(prefillData.serviceId);
  }, [selectedCategoryId, prefillData]);

  const selectedPlatform = useMemo(() => platformsData.find(p => p.id === selectedPlatformId), [selectedPlatformId, platformsData]);
  const selectedCategory = useMemo(() => selectedPlatform?.categories.find(c => c.id === selectedCategoryId), [selectedPlatform, selectedCategoryId]);
  const selectedService = useMemo(() => selectedCategory?.services.find(s => s.id === selectedServiceId), [selectedCategory, selectedServiceId]);

  useEffect(() => {
    if (prefillData && selectedPlatformId === prefillData.platformId) return;
    setSelectedCategoryId('');
    setSelectedServiceId('');
  }, [selectedPlatformId]);

  useEffect(() => {
    if (prefillData && selectedCategoryId === prefillData.categoryId) return;
    setSelectedServiceId('');
  }, [selectedCategoryId]);

  const charge = useMemo(() => {
    if (!quantity || !selectedService) return 0;
    return (Number(quantity) * selectedService.rate) / 1000;
  }, [quantity, selectedService]);

  const handleSubmit = () => {
    if (!link || !quantity || !selectedService) return;
    if (Number(quantity) < selectedService.min || Number(quantity) > selectedService.max) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setLink(''); setQuantity(''); }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-bold text-[var(--text-main)] mb-2">{t('placeNewOrder')}</h2>
        <p className="text-[var(--text-muted)]">{t('checkPricing')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl p-8 shadow-2xl border-[var(--glass-border)]">
            
            <div className="space-y-3 mb-8">
              <label className="block text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{t('selectPlatform')}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {platformsData.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedPlatformId(p.id)}
                        className={`cursor-pointer rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${
                            selectedPlatformId === p.id 
                            ? 'bg-[var(--glass-bg)] border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                            : 'bg-[var(--glass-bg)] border-[var(--glass-border)] hover:bg-[var(--glass-border)] opacity-70 hover:opacity-100'
                        } border`}
                      >
                          <p.icon width={32} height={32} className={selectedPlatformId === p.id ? 'drop-shadow-md' : 'grayscale hover:grayscale-0 transition-all'} />
                          <span className={`text-xs font-bold ${selectedPlatformId === p.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{p.name}</span>
                      </div>
                  ))}
              </div>
            </div>

            <div className={`space-y-3 mb-8 transition-all duration-500 ${!selectedPlatformId ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100'}`}>
              <label className="block text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{t('selectCategory')}</label>
              <div className="relative group">
                <select 
                  className="w-full glass-input rounded-xl px-5 py-4 text-[var(--text-main)] appearance-none focus:outline-none focus:border-amber-500 transition-colors cursor-pointer text-lg font-medium"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <option value="" className="text-black">-- Select Category --</option>
                  {selectedPlatform?.categories.map(c => (
                    <option key={c.id} value={c.id} className="text-black">{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none group-hover:text-amber-500 transition-colors" size={24} />
              </div>
            </div>

            <div className={`space-y-3 mb-8 transition-all duration-500 ${!selectedCategoryId ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100'}`}>
              <label className="block text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{t('selectService')}</label>
              <div className="relative group">
                <select 
                  className="w-full glass-input rounded-xl px-5 py-4 text-[var(--text-main)] appearance-none focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer text-base font-medium"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  <option value="" className="text-black">-- Select Service --</option>
                  {selectedCategory?.services.map(s => (
                    <option key={s.id} value={s.id} className="text-black">{s.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none group-hover:text-emerald-500 transition-colors" size={24} />
              </div>
            </div>

            <div className="space-y-3 mb-8">
                <label className="block text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{t('link')}</label>
                <input 
                  type="text" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full glass-input rounded-xl px-5 py-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 transition-all text-base font-mono"
                />
            </div>

            <div className="space-y-3 mb-8">
                <label className="block text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{t('quantity')}</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0"
                  className="w-full glass-input rounded-xl px-5 py-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500 transition-all text-base font-mono"
                />
                {selectedService && quantity !== '' && (Number(quantity) < selectedService.min || Number(quantity) > selectedService.max) && (
                   <p className="text-amber-500 text-xs flex items-center gap-1 font-bold animate-pulse">
                      <AlertCircle size={14} />
                      Must be between {selectedService.min} and {selectedService.max}
                   </p>
                )}
            </div>

            <div className="bg-gradient-to-r from-amber-900/10 to-orange-900/10 p-6 rounded-2xl border border-[var(--glass-border)] flex justify-between items-center mb-8 shadow-inner">
                <span className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-sm">{t('charge')}</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-amber-500">${charge.toFixed(2)}</span>
            </div>

            <button 
                onClick={handleSubmit}
                disabled={!selectedService || !link || !quantity || Number(quantity) < (selectedService?.min || 0) || Number(quantity) > (selectedService?.max || 0)}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-black text-xl shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 hover:-translate-y-1"
            >
                {success ? <CheckCircle2 size={28} className="animate-bounce" /> : <ShoppingCart size={24} />}
                {success ? t('orderSuccess') : t('submitOrder')}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="glass-card p-5 rounded-2xl text-center hover:bg-[var(--glass-bg)] transition-colors border-[var(--glass-border)]">
                 <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-2">{t('minAmount')}</p>
                 <p className="text-2xl font-bold text-[var(--text-main)]">{selectedService ? selectedService.min.toLocaleString() : '-'}</p>
             </div>
             <div className="glass-card p-5 rounded-2xl text-center hover:bg-[var(--glass-bg)] transition-colors border-[var(--glass-border)]">
                 <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest mb-2">{t('maxAmount')}</p>
                 <p className="text-2xl font-bold text-[var(--text-main)]">{selectedService ? selectedService.max.toLocaleString() : '-'}</p>
             </div>
          </div>

          <div className="glass-card rounded-2xl p-6 h-fit relative overflow-hidden border-[var(--glass-border)]">
             <div className="flex items-center gap-2 mb-4 text-amber-500">
                <AlertCircle size={20} />
                <h3 className="font-bold text-[var(--text-main)]">{t('description')}</h3>
             </div>
             <div className="bg-[var(--glass-bg)] rounded-xl p-5 text-sm text-[var(--text-main)] leading-relaxed border border-[var(--glass-border)] min-h-[150px]">
               {/* @ts-ignore */}
               {selectedService ? selectedService.description : t('selectToView')}
             </div>
             
             <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-xs text-[var(--text-muted)] flex gap-2">
                    <span className="text-amber-500">⚠️</span>
                    Make sure your account is public. Private accounts cannot receive followers or likes.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;