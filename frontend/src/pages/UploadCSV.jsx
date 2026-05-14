import { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/invoices/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message || 'File uploaded and processed successfully.');
      setFile(null);
      if (document.getElementById('csv-upload')) {
        document.getElementById('csv-upload').value = '';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in py-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
          Data <span className="text-indigo-500">Ingestion</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Securely upload your pending credit records. Our AI engine will automatically analyze the overdue duration and generate the appropriate follow-up emails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
            
            <form onSubmit={handleUpload} className="space-y-8 relative z-10">
              <div className="group relative">
                <div className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                  file 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-gray-700 hover:border-indigo-500/50 hover:bg-white/5'
                }`}>
                  <input 
                    type="file" 
                    id="csv-upload" 
                    accept=".csv" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="flex flex-col items-center">
                    <div className={`p-4 rounded-full mb-6 transition-transform duration-500 group-hover:scale-110 ${
                      file ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {file ? file.name : 'Drop your CSV here'}
                    </h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      Drag and drop your file or click to browse. Only .csv files are supported.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-shake">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              {message && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3 animate-fade-in">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {message}
                </div>
              )}

              <div className="flex justify-center md:justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading || !file}
                  className={`relative group px-10 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300
                    ${loading || !file 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/25'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Agent Logic...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      <span>Trigger Automation</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/5 shadow-xl">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Required Headers</h3>
            <div className="space-y-3">
              {['invoice_no', 'client_name', 'amount', 'due_date', 'email'].map((header) => (
                <div key={header} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <code className="text-xs text-indigo-300">{header}</code>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Quick Tip
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              For best results, ensure the <code>due_date</code> is in <code>YYYY-MM-DD</code> format. This helps the AI accurately determine the escalation stage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;
