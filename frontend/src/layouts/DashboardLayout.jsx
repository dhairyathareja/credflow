import { Outlet, NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
          : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
      }`
    }
  >
    <div className="transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <span className="font-bold tracking-wide">{label}</span>
  </NavLink>
);

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#06080f] text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 border-r border-white/5 bg-[#0b0f19] flex flex-col relative z-20">
        <div className="h-24 flex items-center px-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-600/40 rotate-3">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">CREDFLOW<span className="text-indigo-500">AI</span></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60 leading-none">Smart Payment Recovery</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-4">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Main Menu</span>
          </div>
          <NavItem
            to="/dashboard"
            label="Overview"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <NavItem
            to="/upload"
            label="Ingest Data"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
          />
          <NavItem
            to="/logs"
            label="Audit Trail"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        </nav>
        
        <div className="p-6">
          <div className="glass-panel rounded-3xl p-5 border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-colors">
            <div className="relative">
              <img className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all" src="https://ui-avatars.com/api/?name=Finance+Admin&background=6366f1&color=fff" alt="User" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0b0f19] rounded-full"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate">Finance Admin</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Premium Access</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#06080f]">
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>

        {/* Top header */}
        <header className="h-24 flex-shrink-0 flex items-center justify-between px-12 border-b border-white/5 bg-[#0b0f19]/60 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <h1 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">System Control Panel</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Agent Active</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
