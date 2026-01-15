import React, { useContext, useState } from 'react';
import { UserContext, LanguageContext } from '../App';
import { MessageSquare, Send, Plus, User, Headphones } from 'lucide-react';

const Tickets: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const { t } = useContext(LanguageContext);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTicketMsg, setNewTicketMsg] = useState('');

  const selectedTicket = state.tickets.find(t => t.id === selectedTicketId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !newMessage.trim()) return;

    dispatch({
        type: 'REPLY_TICKET',
        payload: {
            ticketId: selectedTicketId,
            message: newMessage,
            sender: 'user'
        }
    });
    setNewMessage('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newSubject.trim() || !newTicketMsg.trim()) return;

      const newTicket = {
          id: `tkt-${Date.now()}`,
          subject: newSubject,
          status: 'Open',
          lastUpdated: new Date().toLocaleDateString(),
          messages: [
              { sender: 'user', text: newTicketMsg, date: new Date().toLocaleString() }
          ]
      };

      // @ts-ignore
      dispatch({ type: 'ADD_TICKET', payload: newTicket });
      setNewSubject('');
      setNewTicketMsg('');
      setShowNewTicketForm(false);
      setSelectedTicketId(newTicket.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[80vh] animate-in fade-in duration-500">
        {/* Left Col: Ticket List */}
        <div className="glass-card rounded-3xl p-6 flex flex-col h-full border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{t('supportTickets')}</h2>
                <button 
                    onClick={() => setShowNewTicketForm(true)}
                    className="p-3 bg-fuchsia-600 rounded-xl hover:bg-fuchsia-500 transition-colors shadow-lg shadow-fuchsia-500/20"
                >
                    <Plus size={20} className="text-white" />
                </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {state.tickets.length === 0 ? (
                    <div className="text-center py-10 opacity-50">
                        <MessageSquare size={48} className="mx-auto mb-4" />
                        <p>{t('ticketsDesc')}</p>
                    </div>
                ) : (
                    state.tickets.map(ticket => (
                        <div 
                            key={ticket.id}
                            onClick={() => { setSelectedTicketId(ticket.id); setShowNewTicketForm(false); }}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                                selectedTicketId === ticket.id 
                                ? 'bg-white/10 border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.2)]' 
                                : 'bg-black/20 border-white/5 hover:bg-white/5'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-white truncate max-w-[70%]">{ticket.subject}</h4>
                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                                    ticket.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' :
                                    ticket.status === 'Answered' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-slate-700 text-slate-400'
                                }`}>
                                    {ticket.status}
                                </span>
                            </div>
                            <p className="text-xs text-purple-200/50">{ticket.lastUpdated}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Right Col: Chat Area or New Form */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border-white/5 flex flex-col h-full relative overflow-hidden">
            {showNewTicketForm ? (
                <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full animate-in zoom-in duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('openTicket')}</h3>
                    <form onSubmit={handleCreateTicket} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-fuchsia-300 uppercase">{t('subject')}</label>
                            <input 
                                className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 outline-none" 
                                value={newSubject}
                                onChange={e => setNewSubject(e.target.value)}
                                placeholder="Order #123 issue..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-fuchsia-300 uppercase">{t('message')}</label>
                            <textarea 
                                className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 outline-none h-40 resize-none" 
                                value={newTicketMsg}
                                onChange={e => setNewTicketMsg(e.target.value)}
                                placeholder="Describe your issue..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <button 
                                type="button" 
                                onClick={() => setShowNewTicketForm(false)}
                                className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold shadow-lg shadow-fuchsia-500/25"
                            >
                                {t('submitTicket')}
                            </button>
                        </div>
                    </form>
                </div>
            ) : selectedTicket ? (
                <>
                    {/* Chat Header */}
                    <div className="pb-4 border-b border-white/10 mb-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{selectedTicket.subject}</h3>
                            <p className="text-sm text-purple-200/50">ID: {selectedTicket.id}</p>
                        </div>
                        <Headphones className="text-fuchsia-400 opacity-20" size={40} />
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
                        {selectedTicket.messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    msg.sender === 'user' ? 'bg-fuchsia-600' : 'bg-cyan-600'
                                }`}>
                                    {msg.sender === 'user' ? <User size={18} /> : <Headphones size={18} />}
                                </div>
                                <div className={`max-w-[70%] p-4 rounded-2xl ${
                                    msg.sender === 'user' 
                                    ? 'bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-tr-none' 
                                    : 'bg-cyan-500/10 border border-cyan-500/30 rounded-tl-none'
                                }`}>
                                    <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                                    <p className="text-[10px] text-white/30 mt-2 text-right">{msg.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="relative">
                        <input 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={t('typeMessage')}
                            className="w-full bg-black/30 border border-white/10 rounded-2xl pl-6 pr-16 py-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                        />
                        <button 
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fuchsia-600 rounded-xl hover:bg-fuchsia-500 text-white transition-all hover:scale-105"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                    <MessageSquare size={64} className="mb-4" />
                    <p className="text-lg">{t('selectToView')}</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default Tickets;