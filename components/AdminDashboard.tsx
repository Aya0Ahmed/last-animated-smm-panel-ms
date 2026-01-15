import React, { useContext, useState } from 'react';
import { UserContext, LanguageContext } from '../App';
import { BarChart2, Users, DollarSign, Package, CheckCircle, XCircle, Edit, Save } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'services' | 'users'>('overview');

  // Stats
  const totalRevenue = state.orders.reduce((acc, order) => acc + (order.charge || 0), 0);
  const totalOrders = state.orders.length;
  const totalUsers = state.allUsers.length;

  const chartData = [
    { name: 'Mon', revenue: 120 },
    { name: 'Tue', revenue: 300 },
    { name: 'Wed', revenue: 200 },
    { name: 'Thu', revenue: 450 },
    { name: 'Fri', revenue: 280 },
    { name: 'Sat', revenue: 600 },
    { name: 'Sun', revenue: 500 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black text-[var(--text-main)]">{t('adminDashboard')}</h2>
        <div className="flex gap-2 bg-[var(--glass-bg)] p-1 rounded-xl">
            {['overview', 'orders', 'services', 'users'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-lg font-bold capitalize transition-all ${
                        activeTab === tab ? 'bg-amber-500 text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                >
                    {/* @ts-ignore */}
                    {t(tab) || tab}
                </button>
            ))}
        </div>
      </div>

      {activeTab === 'overview' && (
          <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                      <div>
                          <p className="text-[var(--text-muted)] font-bold uppercase text-xs">{t('revenue')}</p>
                          <p className="text-3xl font-black text-emerald-400">${totalRevenue.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400"><DollarSign /></div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                      <div>
                          <p className="text-[var(--text-muted)] font-bold uppercase text-xs">{t('totalOrders')}</p>
                          <p className="text-3xl font-black text-amber-400">{totalOrders}</p>
                      </div>
                      <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400"><Package /></div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                      <div>
                          <p className="text-[var(--text-muted)] font-bold uppercase text-xs">{t('totalUsers')}</p>
                          <p className="text-3xl font-black text-blue-400">{totalUsers}</p>
                      </div>
                      <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Users /></div>
                  </div>
              </div>

              {/* Chart */}
              <div className="glass-card p-8 rounded-3xl h-[400px]">
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-6">Revenue Analytics</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#222', borderRadius: '10px', border: '1px solid #333' }}
                            itemStyle={{ color: '#fbbf24' }}
                        />
                        <Bar dataKey="revenue" fill="#fbbf24" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
      )}

      {activeTab === 'orders' && (
          <div className="glass-card rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="bg-black/20 text-[var(--text-muted)]">
                          <tr>
                              <th className="p-4">{t('id')}</th>
                              <th className="p-4">{t('service')}</th>
                              <th className="p-4">{t('quantity')}</th>
                              <th className="p-4">{t('charge')}</th>
                              <th className="p-4">{t('status')}</th>
                              <th className="p-4">{t('adminActions')}</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--glass-border)]">
                          {state.orders.map(order => (
                              <tr key={order.id} className="hover:bg-white/5">
                                  <td className="p-4 text-[var(--text-main)] font-mono text-sm">{order.id}</td>
                                  <td className="p-4 text-[var(--text-main)]">{order.serviceName}</td>
                                  <td className="p-4 text-[var(--text-main)]">{order.quantity}</td>
                                  <td className="p-4 text-[var(--text-main)]">${order.charge?.toFixed(2)}</td>
                                  <td className="p-4">
                                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                                          order.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 
                                          order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' : 
                                          'bg-amber-500/20 text-amber-400'
                                      }`}>
                                          {order.status}
                                      </span>
                                  </td>
                                  <td className="p-4 flex gap-2">
                                      <button 
                                        onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: 'Completed' } })}
                                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded" title={t('markCompleted')}
                                      >
                                          <CheckCircle size={16} />
                                      </button>
                                      <button 
                                        onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: 'Pending' } })}
                                        className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded" title={t('markPending')}
                                      >
                                          <XCircle size={16} />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      )}

      {activeTab === 'users' && (
          <div className="glass-card rounded-3xl overflow-hidden p-6">
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">{t('manageUsers')}</h3>
              <div className="grid gap-4">
                  {state.allUsers.map(u => (
                      <div key={u.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-white/5 rounded-2xl border border-[var(--glass-border)]">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                                  {u.name.charAt(0)}
                              </div>
                              <div>
                                  <p className="font-bold text-[var(--text-main)]">{u.name}</p>
                                  <p className="text-xs text-[var(--text-muted)]">{u.email}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-6 mt-4 md:mt-0">
                              <div className="text-right">
                                  <p className="text-xs text-[var(--text-muted)] uppercase">Balance</p>
                                  <p className="text-xl font-bold text-emerald-400">${u.balance.toFixed(2)}</p>
                              </div>
                              <button 
                                onClick={() => dispatch({ type: 'ADMIN_ADD_BALANCE', payload: { userId: u.id, amount: 10 } })}
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-400"
                              >
                                  + $10
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;