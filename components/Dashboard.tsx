import React, { useContext, useMemo } from 'react';
import { UserContext, LanguageContext } from '../App';
import { TrendingUp, ShoppingBag, DollarSign, Clock, BarChart2, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { state } = useContext(UserContext);
  const { t } = useContext(LanguageContext);

  const chartData = useMemo(() => {
    const serviceCounts: { [key: string]: number } = {};
    state.orders.forEach((order) => {
      const name = order.serviceName;
      if (name) serviceCounts[name] = (serviceCounts[name] || 0) + 1;
    });

    return Object.entries(serviceCounts)
      .map(([name, count]) => ({
        name: name,
        count: count,
        displayName: name.length > 15 ? name.substring(0, 12) + '...' : name
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [state.orders]);

  const stats = [
    { label: t('totalSpent'), value: `$${state.spent.toFixed(2)}`, icon: DollarSign, color: 'text-white', bg: 'bg-gradient-to-br from-emerald-400 to-teal-600', shadow: 'shadow-emerald-500/40' },
    { label: t('activeOrders'), value: state.orders.filter(o => o.status !== 'Completed').length.toString(), icon: ShoppingBag, color: 'text-white', bg: 'bg-gradient-to-br from-amber-400 to-orange-600', shadow: 'shadow-amber-500/40' },
    { label: t('totalOrders'), value: state.orders.length.toString(), icon: TrendingUp, color: 'text-white', bg: 'bg-gradient-to-br from-blue-400 to-indigo-600', shadow: 'shadow-blue-500/40' },
    { label: t('pending'), value: state.orders.filter(o => o.status === 'Pending').length.toString(), icon: Clock, color: 'text-white', bg: 'bg-gradient-to-br from-rose-400 to-red-500', shadow: 'shadow-rose-500/40' },
  ];

  const BAR_COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#78350f'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--glass-bg)] rounded-2xl backdrop-blur-md border border-[var(--glass-border)]">
            <Activity className="text-amber-500 animate-pulse" size={32} />
        </div>
        <div>
            <h2 className="text-5xl font-black text-[var(--text-main)] mb-1 drop-shadow-md">{t('dashboard')}</h2>
            <p className="text-[var(--text-muted)] text-lg">{t('welcomeBack')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="card-3d glass-card p-6 rounded-[2rem] flex items-center justify-between hover:bg-[var(--glass-bg)] transition-all duration-300 cursor-default group border-[var(--glass-border)]">
            <div>
              <p className="text-sm text-[var(--text-muted)] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-[var(--text-main)] drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-lg ${stat.shadow} group-hover:rotate-12 transition-transform duration-300`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border border-[var(--glass-border)] shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white shadow-lg shadow-amber-500/30">
                <BarChart2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)]">{t('topServices')}</h3>
          </div>
          
          <div className="h-[350px] w-full" dir="ltr">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                  <XAxis 
                    dataKey="displayName" 
                    stroke="var(--text-muted)" 
                    tick={{fill: 'var(--text-muted)', fontSize: 12, fontWeight: 600}} 
                    axisLine={false} 
                    tickLine={false} 
                    interval={0}
                    dy={10}
                  />
                  <YAxis 
                    stroke="var(--text-muted)" 
                    tick={{fill: 'var(--text-muted)', fontSize: 12}} 
                    axisLine={false} 
                    tickLine={false} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{fill: 'var(--glass-bg)'}}
                    contentStyle={{ 
                        backgroundColor: 'var(--card-bg)', 
                        backdropFilter: 'blur(10px)',
                        borderColor: 'var(--glass-border)', 
                        color: 'var(--text-main)', 
                        borderRadius: '16px', 
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        border: '1px solid var(--glass-border)'
                    }}
                    itemStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }}
                    labelStyle={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '12px', textTransform: 'uppercase' }}
                  />
                  <Bar dataKey="count" radius={[12, 12, 0, 0]} animationDuration={1500}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} strokeWidth={0} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
               <div className="h-full w-full flex items-center justify-center text-[var(--text-muted)] flex-col gap-4">
                 <BarChart2 size={64} className="opacity-50" />
                 <p className="font-bold">{t('noOrders')}</p>
               </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 border border-[var(--glass-border)] shadow-2xl">
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              {t('recentOrders')}
          </h3>
          <div className="space-y-4">
            {state.orders.length === 0 ? (
              <p className="text-[var(--text-muted)] text-center py-8 font-medium">{t('noOrders')}</p>
            ) : (
              state.orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-[var(--glass-bg)] rounded-2xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-all hover:scale-[1.02] group cursor-pointer hover:shadow-lg">
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-[var(--text-main)] truncate group-hover:text-amber-500 transition-colors">{order.serviceName}</p>
                    <p className="text-xs text-[var(--text-muted)] font-medium">{order.date}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-md ${
                    order.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-500' :
                    order.status === 'Processing' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border border-[var(--glass-border)]">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;