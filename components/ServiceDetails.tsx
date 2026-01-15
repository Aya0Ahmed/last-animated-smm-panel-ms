import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import { Service, ServicePackage } from '../types';
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';

interface ServiceDetailsProps {
  service: Service;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack }) => {
  const { t, lang } = useContext(LanguageContext);
  
  // Mock packages based on the service ID - In a real app, this comes from an API
  const getPackages = (serviceId: string): ServicePackage[] => {
    // Generate generic packages for demo purposes based on the service name
    const baseName = service.title.split(' ')[0]; // e.g., "TikTok"
    const type = service.title.split(' ').slice(1).join(' '); // e.g., "Views"

    return [
      {
        id: 'pkg_1',
        name: `Starter ${type}`,
        price: 4.99,
        description: `1,000 ${type} - Perfect for testing the waters.`,
        deliveryTime: '1-2 Hours'
      },
      {
        id: 'pkg_2',
        name: `Growth ${type}`,
        price: 14.99,
        description: `5,000 ${type} - Boost your visibility significantly.`,
        deliveryTime: '6-12 Hours'
      },
      {
        id: 'pkg_3',
        name: `Viral ${type}`,
        price: 49.99,
        description: `25,000 ${type} - Get noticed immediately by the algorithm.`,
        deliveryTime: '24 Hours'
      },
      {
        id: 'pkg_4',
        name: `Celebrity ${type}`,
        price: 199.99,
        description: `100,000 ${type} - The ultimate package for massive reach.`,
        deliveryTime: '2-3 Days'
      }
    ];
  };

  const packages = getPackages(service.id);
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(packages[0]);

  return (
    <div className="animate-in slide-in-from-right duration-500 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
        </button>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${service.bg} ${service.color}`}>
            <service.icon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">{service.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Package Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">{t('choosePackage') || 'Choose a Package'}</h3>
          
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  selectedPkg?.id === pkg.id 
                    ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' 
                    : 'bg-card border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedPkg?.id === pkg.id 
                      ? 'border-indigo-500 bg-indigo-500' 
                      : 'border-slate-600 group-hover:border-slate-400'
                  }`}>
                    {selectedPkg?.id === pkg.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <h4 className={`font-bold ${selectedPkg?.id === pkg.id ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {pkg.name}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1">{pkg.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${selectedPkg?.id === pkg.id ? 'text-white' : 'text-slate-300'}`}>
                    ${pkg.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-card border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              {/* Decorative gradient */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50`} />
              
              <h3 className="text-lg font-bold text-white mb-6">{t('orderSummary') || 'Order Summary'}</h3>
              
              {selectedPkg ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
                    <div>
                      <p className="text-indigo-400 font-medium text-sm mb-1">{t('selectedPackage') || 'Selected Package'}</p>
                      <p className="text-white font-bold text-lg">{selectedPkg.name}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">${selectedPkg.price}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Clock size={16} className="text-indigo-400" />
                      <span>{t('delivery') || 'Delivery Time'}: <span className="text-slate-200">{selectedPkg.deliveryTime}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <ShieldCheck size={16} className="text-green-400" />
                      <span>{t('guarantee') || 'Refill Guarantee'}: <span className="text-slate-200">30 Days</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Zap size={16} className="text-yellow-400" />
                      <span>{t('startSpeed') || 'Start Speed'}: <span className="text-slate-200">Instant</span></span>
                    </div>
                  </div>

                  {/* Inputs for Order */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-slate-300">{t('linkUrl') || 'Link / Username'}</label>
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      className="w-full bg-darker border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <button className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98]">
                    {t('purchase') || 'Purchase Now'}
                  </button>
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">{t('selectToView') || 'Select a package to view details'}</p>
              )}
            </div>
            
            <p className="text-xs text-center text-slate-500">
              {t('secureCheckout') || 'Secure checkout powered by Stripe'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
