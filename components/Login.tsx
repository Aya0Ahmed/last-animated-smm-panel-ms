import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, LanguageContext } from '../App';
import { Rocket, Lock, Mail, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("https://darkred-cattle-643099.hostingersite.com/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Login failed");
      setLoading(false);
      return;
    }

    login({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role
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
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-fuchsia-500 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500 rounded-full blur-[80px] opacity-30 animate-pulse animation-delay-2000"></div>

        <div className="relative z-10 text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-fuchsia-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/30">
                <Rocket size={40} className="text-white animate-bounce" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">{t('loginTitle')}</h2>
            <p className="text-purple-200/60">{t('loginDesc')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
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

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        {t('login')} <ArrowRight size={20} />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center relative z-10">
            <p className="text-purple-200/60 text-sm">
                {t('noAccount')} 
                <button onClick={() => navigate('/signup')} className="text-fuchsia-400 hover:text-white font-bold ml-2 underline decoration-dotted underline-offset-4">
                    {t('createAccount')}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
