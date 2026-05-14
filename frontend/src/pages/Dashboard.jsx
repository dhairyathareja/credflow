import { useState, useEffect } from 'react';
import axios from 'axios';

const StatCard = ({ title, value, icon, colorClass, delay }) => (
  <div 
    className={`glass-panel rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 animate-fade-in shadow-xl border border-white/5`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.03] transition-all duration-700 group-hover:scale-150 group-hover:opacity-[0.08] ${colorClass}`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 backdrop-blur-md border border-white/5 text-white transition-transform duration-500 group-hover:rotate-12`}>
        {icon}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-4xl font-black text-white tracking-tight">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0, escalated: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();

    // Polling for real-time background updates
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-indigo-400 font-medium animate-pulse">Initializing Agent Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in py-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">Performance Monitor</span>
          <h1 className="text-5xl font-black tracking-tighter text-white">CredFlow <span className="text-indigo-500">Dashboard</span></h1>
        </div>
        <div className="flex gap-3">
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs font-bold text-indigo-300 uppercase">Live System</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Invoices Analyzed" 
          value={stats.total} 
          delay={100}
          colorClass="bg-blue-600"
          icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <StatCard 
          title="Emails Dispatched" 
          value={stats.success} 
          delay={200}
          colorClass="bg-emerald-600"
          icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <StatCard 
          title="Delivery Failures" 
          value={stats.failed} 
          delay={300}
          colorClass="bg-rose-600"
          icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <StatCard 
          title="Legal Flagged" 
          value={stats.escalated} 
          delay={400}
          colorClass="bg-amber-600"
          icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12">
             <svg className="w-80 h-80 text-white" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
             </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-6">Escalation Logic</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Our autonomous agent employs a progressive urgency matrix. By analyzing the <span className="text-indigo-400 font-bold">due_date</span>, it dynamically shifts communication styles to ensure maximum recovery rates while maintaining professional relationships.
            </p>
            <div className="space-y-4">
              {[
                { stage: '1st Follow-Up', tone: 'Warm & Friendly', color: 'text-indigo-400' },
                { stage: '2nd Follow-Up', tone: 'Polite but Firm', color: 'text-blue-400' },
                { stage: '3rd Follow-Up', tone: 'Formal & Serious', color: 'text-purple-400' },
                { stage: '4th Follow-Up', tone: 'Stern & Urgent', color: 'text-amber-400' },
                { stage: 'Escalation Flag', tone: 'Mandatory Legal Review', color: 'text-rose-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{item.stage}</span>
                  <span className={`text-sm font-black ${item.color} group-hover/item:scale-110 transition-transform`}>{item.tone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5 flex-1 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5"></div>
            <h2 className="text-6xl font-black text-white mb-4 relative z-10 tracking-tighter">AI Powered</h2>
            <p className="text-gray-400 text-xl relative z-10 leading-relaxed">
              Leveraging <span className="text-indigo-400">Google Gemini</span> to generate hyper-personalized, context-aware reminders that convert overdue invoices into settled payments.
            </p>
          </div>
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             <h3 className="text-2xl font-black mb-4">Ready to Process?</h3>
             <p className="text-indigo-100 mb-8 text-lg">Navigate to the Upload section to ingest your latest credit records and let the agent handle the rest.</p>
             <button onClick={() => window.location.href='/upload'} className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">
                Go to Upload
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
