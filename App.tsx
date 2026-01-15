import React, { useReducer, createContext, useState, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Zap, PlusCircle, Star, Rocket, Home, Globe, Menu, Bell, User, LogIn, DollarSign, MessageSquare, X, Sun, Moon, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import NewOrder from './components/NewOrder';
import MostWanted from './components/MostWanted';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import AddFunds from './components/AddFunds';
import Tickets from './components/Tickets';
import AdminDashboard from './components/AdminDashboard';

const SupportChat = () => <div className="fixed bottom-4 right-4 bg-amber-500 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform z-50"><Zap size={24} fill="white" className="text-white" /></div>;

// ServicesProvider
const ServicesContext = createContext<any>(null);
const ServicesProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => <ServicesContext.Provider value={{}}>{children}</ServicesContext.Provider>;

import { translations } from './translations';
import { UserState, Language, UserProfile, Ticket, SMMService, Theme, ThemeContextType } from './types';

// --- CONTEXTS ---

// 1. User Data Context
const initialState: UserState = {
  balance: 5.00,
  spent: 125.50,
  name: 'John Doe',
  orders: [
    { id: 'ord-8821', serviceId: '101', serviceName: 'Instagram Followers', link: 'https://inst...', quantity: 1000, charge: 2.50, status: 'Completed', date: '10/24/2023' },
    { id: 'ord-8822', serviceId: '201', serviceName: 'TikTok Followers', link: 'https://tik...', quantity: 500, charge: 2.00, status: 'Processing', date: '10/25/2023' }
  ],
  tickets: [
      {
          id: 'tkt-001',
          subject: 'Order Stuck',
          status: 'Answered',
          lastUpdated: '10/26/2023',
          messages: [
              { sender: 'user', text: 'My order #8822 is still processing.', date: '10/26/2023, 10:00 AM' },
              { sender: 'admin', text: 'Hi, we are looking into it.', date: '10/26/2023, 10:15 AM' }
          ]
      }
  ],
  services: [],
  allUsers: [
      { id: 'u1', name: 'Demo User', email: 'user@example.com', role: 'user', balance: 5.00, spent: 125.50, orders: [] },
      { id: 'u2', name: 'Admin', email: 'admin@atl3.com', role: 'admin', balance: 9999.00, spent: 0, orders: [] }
  ]
};

type Action = 
  | { type: 'ADD_ORDER', payload: any }
  | { type: 'DEDUCT_BALANCE', payload: number }
  | { type: 'ADD_FUNDS', payload: number }
  | { type: 'ADD_TICKET', payload: Ticket }
  | { type: 'REPLY_TICKET', payload: { ticketId: string, message: string, sender: 'user' | 'admin' } }
  | { type: 'SET_SERVICES', payload: SMMService[] }
  | { type: 'ADD_SERVICE', payload: SMMService }
  | { type: 'LOAD_STATE', payload: UserState }
  // Admin Actions
  | { type: 'UPDATE_ORDER_STATUS', payload: { orderId: string, status: string } }
  | { type: 'UPDATE_SERVICE_RATE', payload: { serviceId: string, newRate: number } }
  | { type: 'ADMIN_ADD_BALANCE', payload: { userId: string, amount: number } };

const reducer = (state: UserState, action: Action): UserState => {
  let newState: UserState = state;
  switch (action.type) {
    case 'ADD_ORDER':
      newState = { ...state, orders: [action.payload, ...state.orders] };
      break;
    case 'DEDUCT_BALANCE':
      newState = { ...state, balance: state.balance - action.payload, spent: state.spent + action.payload };
      break;
    case 'ADD_FUNDS':
      newState = { ...state, balance: state.balance + action.payload };
      break;
    case 'ADD_TICKET':
      newState = { ...state, tickets: [action.payload, ...state.tickets] };
      break;
    case 'REPLY_TICKET':
      newState = {
          ...state,
          tickets: state.tickets.map(ticket => 
            ticket.id === action.payload.ticketId 
            ? { 
                ...ticket, 
                status: action.payload.sender === 'admin' ? 'Answered' : 'Open', 
                messages: [...ticket.messages, { sender: action.payload.sender, text: action.payload.message, date: new Date().toLocaleString() }]
              } 
            : ticket
          )
      };
      break;
    case 'SET_SERVICES':
      newState = { ...state, services: action.payload };
      break;
    case 'ADD_SERVICE':
      newState = { ...state, services: [...state.services, action.payload] };
      break;
    case 'LOAD_STATE':
      return action.payload;
    case 'UPDATE_ORDER_STATUS':
      newState = {
        ...state,
        orders: state.orders.map(o => o.id === action.payload.orderId ? { ...o, status: action.payload.status as any } : o)
      };
      break;
    case 'UPDATE_SERVICE_RATE':
      // This would normally update the services array, but our services are hardcoded in components for now. 
      // In a real app, services would be in state.
      return state;
    case 'ADMIN_ADD_BALANCE':
      newState = {
        ...state,
        allUsers: state.allUsers.map(u => u.id === action.payload.userId ? { ...u, balance: u.balance + action.payload.amount } : u),
        balance: state.name === 'Admin' ? state.balance : (state.allUsers.find(u => u.id === action.payload.userId)?.name === state.name ? state.balance + action.payload.amount : state.balance)
      };
      break;
    default:
      return state;
  }
  
  localStorage.setItem('nexus_app_state', JSON.stringify(newState));
  return newState;
};

export const UserContext = createContext<{state: UserState, dispatch: React.Dispatch<Action>}>({
  state: initialState,
  dispatch: () => null
});

// 2. Language Context
export const LanguageContext = createContext<{
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: keyof typeof translations.en) => string;
    dir: 'ltr' | 'rtl';
}>({
    lang: 'en',
    setLang: () => {},
    t: (k) => k,
    dir: 'ltr'
});

// 3. Auth Context
export const AuthContext = createContext<{
    user: UserProfile | null;
    login: (u: UserProfile) => void;
    logout: () => void;
}>({
    user: null,
    login: () => {},
    logout: () => {}
});

// 4. Theme Context
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children?: React.ReactNode, requireAdmin?: boolean }> = ({ children, requireAdmin = false }) => {
    const { user } = useContext(AuthContext);
    // In real app: if (!user) return <Navigate to="/login" replace />;
    // if (requireAdmin && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
    return <>{children}</>; 
};

// Page Transition Component
const PageTransition = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.98 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="h-full"
  >
    {children}
  </motion.div>
);

// Animated Routes Wrapper
const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
                <Route path="/new-order" element={<ProtectedRoute><PageTransition><NewOrder /></PageTransition></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><PageTransition><Services /></PageTransition></ProtectedRoute>} />
                <Route path="/most-ordered" element={<ProtectedRoute><PageTransition><MostWanted /></PageTransition></ProtectedRoute>} />
                <Route path="/add-funds" element={<ProtectedRoute><PageTransition><AddFunds /></PageTransition></ProtectedRoute>} />
                <Route path="/tickets" element={<ProtectedRoute><PageTransition><Tickets /></PageTransition></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute requireAdmin><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

// --- LAYOUT COMPONENT ---
const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useContext(UserContext);
  const { lang, setLang, dir, t } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide header only on Login/Signup pages
  const isPublicPage = ['/login', '/signup'].includes(location.pathname);

  const navItems = [
      { path: '/', label: t('home'), icon: Home },
      { path: '/new-order', label: t('newOrder'), icon: PlusCircle },
      { path: '/most-ordered', label: t('popular'), icon: Star },
      { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
      { path: '/services', label: t('services'), icon: Zap },
      { path: '/add-funds', label: t('addFunds'), icon: DollarSign },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: t('adminDashboard'), icon: Settings });
  }

  return (
    <div className={`min-h-screen font-sans ${lang === 'ar' ? 'font-arabic' : ''}`} dir={dir}>
          
          {/* Layer 1: Animated Background Blobs (Theme Aware) */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[var(--bg-color)] transition-colors duration-500">
            <div className={`absolute top-[-10%] left-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob ${theme === 'dark' ? 'bg-amber-700' : 'bg-amber-400'}`}></div>
            <div className={`absolute top-[10%] right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000 ${theme === 'dark' ? 'bg-orange-800' : 'bg-orange-400'}`}></div>
            <div className={`absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-blob animation-delay-4000 ${theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-500'}`}></div>
          </div>

          {/* Layer 2: 3D Moving Grid (Horizon Floor) */}
          <div className="grid-container-3d">
            <div className="grid-floor"></div>
          </div>

          {/* SIDE MENU DRAWER (Mobile/Tablet) */}
          <AnimatePresence>
          {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 flex">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}
                  ></motion.div>
                  <motion.div 
                    initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
                    transition={{ type: "spring", damping: 20 }}
                    className={`relative w-80 h-full bg-[var(--glass-bg)] border-r border-[var(--glass-border)] backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-6 ${dir === 'rtl' ? 'ml-auto' : ''}`}
                  >
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                                  <Rocket size={20} fill="white" />
                              </div>
                              <span className="text-2xl font-black text-[var(--text-main)]">ATL3</span>
                          </div>
                          <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-[var(--glass-border)] rounded-full text-[var(--text-main)]">
                              <X size={20} />
                          </button>
                      </div>

                      <nav className="flex flex-col gap-2">
                          {navItems.map((item) => (
                              <button 
                                key={item.path}
                                onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-bold transition-all ${
                                    location.pathname === item.path 
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' 
                                    : 'text-[var(--text-muted)] hover:bg-[var(--glass-border)] hover:text-[var(--text-main)]'
                                }`}
                              >
                                  <item.icon size={24} />
                                  {item.label}
                              </button>
                          ))}
                      </nav>
                      
                      {/* Mobile Theme Toggle */}
                      <button 
                        onClick={toggleTheme}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-bold text-[var(--text-muted)] hover:bg-[var(--glass-border)] hover:text-[var(--text-main)] transition-all"
                      >
                         {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                         {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>

                      <div className="mt-auto space-y-4">
                            {user ? (
                                <button 
                                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                                    className="w-full py-4 rounded-xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)] text-[var(--text-main)] font-bold flex items-center justify-center gap-2"
                                >
                                    <User size={20} /> Logout
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full py-4 rounded-xl bg-[var(--glass-border)] text-[var(--text-main)] font-bold">
                                        {t('login')}
                                    </button>
                                    <button onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }} className="w-full py-4 rounded-xl bg-amber-500 text-white font-bold">
                                        {t('signup')}
                                    </button>
                                </>
                            )}
                      </div>
                  </motion.div>
              </div>
          )}
          </AnimatePresence>

          {/* TOP HEADER */}
          {!isPublicPage && (
            <motion.header 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full px-6 md:px-10 py-6 mb-8 flex flex-row items-center justify-between gap-6 relative z-30"
            >
              
              <div className="flex items-center gap-4">
                  {/* Hamburger Button (Visible on screens < lg) */}
                  <button 
                    onClick={() => setMobileMenuOpen(true)} 
                    className="lg:hidden p-3 glass-card rounded-xl text-[var(--text-main)] hover:bg-[var(--glass-border)] transition-colors"
                  >
                      <Menu size={28} />
                  </button>

                  {/* Logo */}
                  <div 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-4 select-none group cursor-pointer"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center font-bold text-white shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                      <Rocket size={24} fill="white" className="animate-bounce md:w-8 md:h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-orange-200 tracking-tighter drop-shadow-lg">
                        ATL3 <span className="text-[var(--text-main)] hidden sm:inline">TREND</span>
                      </span>
                    </div>
                  </div>
              </div>

              {/* Navigation Pills (Hidden on screens < lg) */}
              <div className="hidden lg:flex flex-wrap justify-center glass-card p-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                {navItems.map((item) => (
                    <button 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                        location.pathname === item.path 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105' 
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)]'
                    }`}
                    >
                    <item.icon size={18} />
                    {item.label}
                    </button>
                ))}
              </div>

              {/* User Actions & Language */}
              <div className="flex items-center gap-3 md:gap-4">
                  {user ? (
                    <>
                        {/* Balance */}
                        <button 
                            onClick={() => navigate('/add-funds')}
                            className="hidden sm:flex items-center gap-3 glass-card px-6 py-3 rounded-full border border-[var(--glass-border)] hover:border-emerald-500/50 transition-colors group cursor-pointer"
                        >
                            <div className="bg-emerald-500/20 p-1.5 rounded-full">
                                <DollarSign size={16} className="text-emerald-400" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-emerald-400/80 uppercase font-bold tracking-wide">{lang === 'en' ? 'Balance' : 'رصيد'}</span>
                                <span className="text-[var(--text-main)] font-bold font-mono text-lg leading-none">${state.balance.toFixed(2)}</span>
                            </div>
                        </button>
                        
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={() => navigate('/tickets')}
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center glass-card rounded-full text-[var(--text-main)] hover:text-amber-500 border border-[var(--glass-border)] hover:border-amber-500/50 transition-all relative"
                             >
                                <MessageSquare size={24} />
                                {state.tickets.filter(t => t.status !== 'Closed').length > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-black"></span>
                                )}
                             </button>

                             <button 
                                onClick={logout}
                                className="hidden md:flex w-14 h-14 items-center justify-center glass-card rounded-full text-[var(--text-main)] hover:text-red-400 border border-[var(--glass-border)] hover:border-red-500/50 transition-all"
                                title="Logout"
                             >
                                <User size={24} />
                             </button>
                        </div>
                    </>
                  ) : (
                    <div className="hidden sm:flex items-center gap-3">
                        <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-full font-bold text-[var(--text-main)] hover:bg-[var(--glass-border)] transition-colors">
                            {t('login')}
                        </button>
                        <button onClick={() => navigate('/signup')} className="px-6 py-3 rounded-full bg-amber-500 font-bold text-white hover:bg-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-105">
                            {t('signup')}
                        </button>
                    </div>
                  )}

                  <button 
                    onClick={toggleTheme}
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center glass-card text-[var(--text-main)] rounded-full hover:bg-[var(--glass-border)] transition-all active:scale-95 shadow-lg border-2 border-[var(--glass-border)]"
                  >
                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                  </button>

                  <button 
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-lg glass-card text-[var(--text-main)] rounded-full hover:bg-[var(--glass-border)] transition-all active:scale-95 shadow-lg border-2 border-[var(--glass-border)]"
                  >
                    {lang === 'en' ? 'AR' : 'EN'}
                  </button>
              </div>
            </motion.header>
          )}

          <div className="relative z-10 max-w-7xl mx-auto p-4 lg:p-8">
            {/* Main Content */}
            <main className="perspective-container pb-20">
                <AnimatedRoutes />
            </main>

            {user && <SupportChat />}
          </div>
    </div>
  );
}

// 4. Main App
const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
      const savedState = localStorage.getItem('nexus_app_state');
      if (savedState) {
          try {
              const parsed = JSON.parse(savedState);
              dispatch({ type: 'LOAD_STATE', payload: parsed });
          } catch (e) {
              console.error("Failed to load state", e);
          }
      }
      const savedTheme = localStorage.getItem('nexus_theme');
      if (savedTheme === 'light') {
        setTheme('light');
        document.body.classList.add('light-mode');
      }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('nexus_theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const t = (key: keyof typeof translations.en) => {
      // @ts-ignore
      return translations[lang][key] || key;
  }

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const login = (u: UserProfile) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <ServicesProvider>
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <AppLayout />
      </Router>
    </UserContext.Provider>
   </ServicesProvider>
    </LanguageContext.Provider>
    </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;