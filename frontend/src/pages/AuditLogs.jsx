import { useState, useEffect } from 'react';
import axios from 'axios';

const Badge = ({ children, type }) => {
  const styles = {
    warm: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    polite: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    formal: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    stern: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    escalated: 'bg-red-500/10 text-red-400 border border-red-500/20',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    failed: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
  };

  // Determine standard keys
  let key = 'warm';
  const lower = children?.toString().toLowerCase() || '';
  if (lower.includes('legal') || lower.includes('escalat')) key = 'escalated';
  else if (lower.includes('stern') || lower.includes('urgent')) key = 'stern';
  else if (lower.includes('formal') || lower.includes('serious')) key = 'formal';
  else if (lower.includes('polite') || lower.includes('firm')) key = 'polite';
  else if (lower.includes('success')) key = 'success';
  else if (lower.includes('fail')) key = 'failed';

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[key]}`}>
      {children}
    </span>
  );
};

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices/logs');
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();

    // Polling for real-time background updates
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    log.invoiceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Audit Logs</h1>
          <p className="text-gray-400">View generated emails and escalation history.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search invoice or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111827] border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          <svg className="w-4 h-4 text-gray-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-gray-800 flex-1 overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No logs found</h3>
            <p className="text-gray-400">Upload a CSV to start generating automated follow-ups.</p>
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-[#111827] sticky top-0 z-10 shadow-sm border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date / Time</th>
                  <th className="px-6 py-4 font-semibold">Invoice No.</th>
                  <th className="px-6 py-4 font-semibold">Client Name</th>
                  <th className="px-6 py-4 font-semibold">Tone Stage</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-indigo-300">
                      {log.invoiceNo}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {log.clientName}
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{log.tone}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{log.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedLog(log)}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        View Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for viewing email content */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-black">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Generated Content</h3>
                <p className="text-sm text-gray-400">For Invoice <span className="font-mono text-indigo-300">{selectedLog.invoiceNo}</span></p>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="bg-[#0b0f19] rounded-xl p-5 border border-gray-800 font-sans text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                {selectedLog.emailContent}
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-[#0b0f19] rounded-lg p-4 border border-gray-800">
                  <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Tone Applied</span>
                  <Badge>{selectedLog.tone}</Badge>
                </div>
                <div className="bg-[#0b0f19] rounded-lg p-4 border border-gray-800">
                  <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Delivery Status</span>
                  <Badge>{selectedLog.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
