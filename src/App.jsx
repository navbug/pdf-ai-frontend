import React, { useState, useEffect } from 'react';
import { FileText, Upload, ClipboardList, CheckCircle, XCircle, Zap, RotateCcw, AlertCircle } from 'lucide-react';
import FileUpload from './components/FileUpload';
import RuleInput from './components/RuleInput';
import ResultsTable from './components/ResultsTable';
import { validateDocument, checkServerHealth } from './services/api';

function App() {
  const [file, setFile] = useState(null);
  const [rules, setRules] = useState({
    rule1: '',
    rule2: '',
    rule3: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverOnline, setServerOnline] = useState(true);

  const exampleRules = [
    'The document must have a purpose section',
    'The document must mention at least one date',
    'The document must define at least one term'
  ];

  useEffect(() => {
    const checkHealth = async () => {
      const isOnline = await checkServerHealth();
      setServerOnline(isOnline);
    };
    checkHealth();
  }, []);

  const handleRuleChange = (ruleKey, value) => {
    setRules(prev => ({
      ...prev,
      [ruleKey]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    if (!file) {
      setError('Please upload a PDF file');
      return;
    }

    if (!rules.rule1.trim() || !rules.rule2.trim() || !rules.rule3.trim()) {
      setError('Please fill in all 3 rules');
      return;
    }

    if (!serverOnline) {
      setError('Backend server is not running. Please start the server first.');
      return;
    }

    setLoading(true);

    try {
      const response = await validateDocument(file, rules);
      
      if (response.success) {
        setResults(response.results);
      } else {
        setError(response.message || 'Validation failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during validation');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setRules({ rule1: '', rule2: '', rule3: '' });
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
            PDF AI
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 font-medium">PDF Compliance Checker</p>
          <p className="text-sm lg:text-base text-gray-500 mt-2 max-w-2xl mx-auto">
            Leverage AI to validate document compliance against custom rules instantly
          </p>
          
          {!serverOnline && (
            <div className="mt-6 mx-auto max-w-2xl">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                  <p className="text-sm font-medium text-red-800">Backend server is offline. Please start the server first.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* File Upload Card */}
            <div className="glass rounded-2xl shadow-xl p-6 lg:p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
              </div>
              <FileUpload
                file={file}
                onFileChange={setFile}
                error={error && !file ? error : ''}
              />
            </div>

            {/* Rules Card */}
            <div className="glass rounded-2xl shadow-xl p-6 lg:p-8 hover-lift">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Define Compliance Rules</h2>
              </div>
              
              <div className="space-y-4">
                <RuleInput
                  label="Rule 1"
                  value={rules.rule1}
                  onChange={(value) => handleRuleChange('rule1', value)}
                  placeholder={exampleRules[0]}
                />
                
                <RuleInput
                  label="Rule 2"
                  value={rules.rule2}
                  onChange={(value) => handleRuleChange('rule2', value)}
                  placeholder={exampleRules[1]}
                />
                
                <RuleInput
                  label="Rule 3"
                  value={rules.rule3}
                  onChange={(value) => handleRuleChange('rule3', value)}
                  placeholder={exampleRules[2]}
                />
              </div>

              {error && !(!file) && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !serverOnline}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-white transition-smooth btn-ripple ${
                    loading || !serverOnline
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <RotateCcw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Validate Document
                    </span>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 py-3.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-smooth active:scale-95 disabled:opacity-50 border border-gray-200"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-8 h-fit">
            {results ? (
              <ResultsTable results={results} />
            ) : (
              <div className="glass rounded-2xl shadow-xl p-8 lg:p-12 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Validate</h3>
                  <p className="text-gray-600 mb-6">
                    Upload your PDF and define compliance rules to see AI-powered validation results here.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>AI-Powered Analysis</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Detailed Evidence</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Confidence Scores</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <div className="inline-flex items-center justify-center space-x-2 text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-gray-100">
            <Zap className="w-4 h-4 text-indigo-500" />
            <span>Created by Naveen Bugalia</span>
            <span className="text-gray-300">•</span>
            <span>Built with MERN Stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;