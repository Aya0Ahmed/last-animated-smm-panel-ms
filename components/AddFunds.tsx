import React, { useContext, useState } from 'react';
import { UserContext, LanguageContext } from '../App';
import { CreditCard, Wallet, Bitcoin, CheckCircle2, XCircle, DollarSign, Lock, ShieldCheck, Smartphone, Globe } from 'lucide-react';
import { PaymentMethod } from '../types';

const AddFunds: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const { t } = useContext(LanguageContext);
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const paymentMethods: PaymentMethod[] = [
      // @ts-ignore
      { id: 'card', name: t('pm_card'), icon: CreditCard, min: 10, fee: '0%', color: 'from-amber-600 to-orange-600' },
      // @ts-ignore
      { id: 'crypto', name: t('pm_crypto'), icon: Bitcoin, min: 20, fee: '1%', color: 'from-orange-500 to-yellow-500' },
      // @ts-ignore
      { id: 'wallet', name: t('pm_wallet'), icon: Wallet, min: 5, fee: '2%', color: 'from-red-600 to-rose-600' },
      // @ts-ignore
      { id: 'egy_wallet', name: t('pm_egy'), icon: Smartphone, min: 1, fee: '0%', color: 'from-red-700 to-red-900' },
      // @ts-ignore
      { id: 'payoneer', name: t('pm_payoneer'), icon: Globe, min: 50, fee: '1%', color: 'from-blue-600 to-blue-800' }
  ];

  const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!amount || Number(amount) < 1) return;
      setProcessing(true);
      setTimeout(() => {
          dispatch({ type: 'ADD_FUNDS', payload: Number(amount) });
          setProcessing(false);
          setSuccess(true);
          setAmount('');
          setTimeout(() => setSuccess(false), 3000);
      }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-black text-[var(--text-main)] mb-2">{t('addFundsTitle')}</h2>
                <p className="text-[var(--text-muted)]">{t('addFundsDesc')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {paymentMethods.map(method => (
                    <div 
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden group ${
                            selectedMethod === method.id 
                            ? 'bg-[var(--glass-bg)] border-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105' 
                            : 'bg-[var(--glass-bg)] border-[var(--glass-border)] hover:bg-[var(--glass-bg)] opacity-80 hover:opacity-100'
                        }`}
                    >
                        <div className={`absolute top-0 right-0 p-1 bg-gradient-to-bl ${method.color} rounded-bl-xl opacity-80`}>
                           <method.icon size={16} className="text-white" />
                        </div>
                        <h4 className="font-bold text-[var(--text-main)] mt-4">{method.name}</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">Min: ${method.min}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-[var(--glass-border)] shadow-2xl relative overflow-hidden">
                {processing ? (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h3 className="text-xl font-bold text-white animate-pulse">{t('processing')}</h3>
                    </div>
                ) : null}

                {success ? (
                    <div className="absolute inset-0 bg-emerald-900/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center animate-in zoom-in">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                            <CheckCircle2 size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{t('paymentSuccess')}</h3>
                        <p className="text-emerald-200 mt-2">{t('fundsAdded')}</p>
                    </div>
                ) : null}

                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">{t('securePayment')}</span>
                        <Lock size={16} className="text-emerald-500" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">{t('amount')}</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full glass-input rounded-xl pl-12 pr-4 py-4 text-[var(--text-main)] text-2xl font-mono focus:outline-none focus:border-amber-500 transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        {Number(amount) > 0 && Number(amount) < 1 && (
                             <p className="text-amber-500 text-xs flex items-center gap-1">
                                <XCircle size={12} /> {t('minDeposit')}
                             </p>
                        )}
                    </div>

                    {selectedMethod === 'card' && (
                        <div className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
                            <div className="space-y-2">
                                <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{t('cardNumber')}</label>
                                <input disabled placeholder="•••• •••• •••• 4242" className="w-full glass-input rounded-lg px-4 py-3 text-[var(--text-muted)] cursor-not-allowed" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{t('expiry')}</label>
                                    <input disabled placeholder="MM/YY" className="w-full glass-input rounded-lg px-4 py-3 text-[var(--text-muted)] cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{t('cvv')}</label>
                                    <input disabled placeholder="•••" className="w-full glass-input rounded-lg px-4 py-3 text-[var(--text-muted)] cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {selectedMethod === 'egy_wallet' && (
                        <div className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
                            <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-center">
                                <Smartphone className="mx-auto text-red-500 mb-2" size={24} />
                                <p className="text-sm text-[var(--text-main)] font-bold">{t('egyWalletInst')}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1">Vodafone Cash / Etisalat Cash</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{t('senderNum')}</label>
                                <input placeholder="01xxxxxxxxx" className="w-full glass-input rounded-lg px-4 py-3 text-[var(--text-main)]" />
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={!amount || Number(amount) < 1}
                        className="w-full py-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] mt-4"
                    >
                        {t('payNow')} ${Number(amount || 0).toFixed(2)}
                    </button>
                    
                    <div className="flex justify-center items-center gap-2 text-xs text-[var(--text-muted)]">
                        <ShieldCheck size={12} />
                        <span>256-bit SSL Encrypted Transaction</span>
                    </div>
                </form>
            </div>
        </div>

        <div className="space-y-8">
             <div className="w-full aspect-video rounded-[2rem] bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl relative p-8 flex flex-col justify-between overflow-hidden group hover:rotate-1 transition-transform card-3d">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <div className="flex justify-between items-start relative z-10">
                     <div className="text-white/80 font-mono text-lg tracking-widest">VISA</div>
                     <div className="w-12 h-8 bg-amber-400/80 rounded-md"></div>
                 </div>
                 <div className="relative z-10">
                     <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{t('cardHolder')}</p>
                     <p className="text-white font-bold text-xl tracking-wider">{state.name}</p>
                 </div>
                 <div className="relative z-10 font-mono text-white/90 text-2xl tracking-widest drop-shadow-md">
                     •••• •••• •••• 8829
                 </div>
             </div>

             <div className="glass-card rounded-[2.5rem] p-8 border border-[var(--glass-border)]">
                 <h3 className="font-bold text-[var(--text-main)] mb-6 flex items-center gap-2">
                     <Wallet className="text-amber-500" size={20} />
                     {t('transactionHistory')}
                 </h3>
                 <div className="space-y-4">
                     {[1, 2, 3].map((_, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                     <CheckCircle2 size={18} />
                                 </div>
                                 <div>
                                     <p className="text-[var(--text-main)] font-bold text-sm">Deposit via Card</p>
                                     <p className="text-xs text-[var(--text-muted)]">Oct {24 - idx}, 2023</p>
                                 </div>
                             </div>
                             <span className="text-emerald-500 font-mono font-bold">+$50.00</span>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    </div>
  );
};

export default AddFunds;