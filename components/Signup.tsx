import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, LanguageContext } from '../App';
import { User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Signup: React.FC = () => {
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("https://darkred-cattle-643099.hostingersite.com/api/signup.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Signup failed");
      setLoading(false);
      return;
    }

    // تسجيل المستخدم في الـ Context
    login({
      id: data.user_id, // جاية من الباك إند
      name,
      email,
      role: "user"
    });

    navigate("/dashboard");
  } catch (err) {
    alert("Server error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 glass-card rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in duration-500">
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500 rounded-full blur-[80px] opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="relative z-10 text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">{t('createAccountTitle')}</h2>
            <p className="text-purple-200/60">{t('createAccountDesc')}</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 relative z-10">
            <div className="space-y-2">
                <label className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest ml-1">{t('fullName')}</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-fuchsia-400 transition-colors" size={20} />
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-fuchsia-500 transition-all placeholder:text-white/20"
                        placeholder="John Doe"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest ml-1">{t('email')}</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-fuchsia-400 transition-colors" size={20} />
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-fuchsia-500 transition-all placeholder:text-white/20"
                        placeholder="user@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest ml-1">{t('password')}</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-fuchsia-400 transition-colors" size={20} />
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-fuchsia-500 transition-all placeholder:text-white/20"
                        placeholder="••••••••"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-2 py-2 cursor-pointer">
                <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center bg-black/20 text-fuchsia-500">
                    <CheckCircle2 size={14} />
                </div>
                <span className="text-xs text-purple-200/60">{t('terms')}</span>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        {t('signup')} <ArrowRight size={20} />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center relative z-10">
            <p className="text-purple-200/60 text-sm">
                {t('haveAccount')} 
                <button onClick={() => navigate('/login')} className="text-emerald-400 hover:text-white font-bold ml-2 underline decoration-dotted underline-offset-4">
                    {t('login')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
