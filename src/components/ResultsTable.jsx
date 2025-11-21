import React from 'react';
import { CheckCircle, XCircle, Star, ClipboardCheck, Info, FileText } from 'lucide-react';

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
  }

  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const avgConfidence = Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length);

  return (
    <div className="animate-fadeIn">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Passed</span>
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">{passCount}</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Failed</span>
            <XCircle className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">{failCount}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Avg Score</span>
            <Star className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold">{avgConfidence}%</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="glass rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <ClipboardCheck className="w-5 h-5 mr-2 text-indigo-600" />
            Validation Results
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="divide-y divide-gray-200">
            {results.map((result, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-smooth">
                {/* Rule Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-bold text-gray-500 mr-2">RULE {index + 1}</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                          result.status === 'pass'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {result.status === 'pass' ? (
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                        )}
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">{result.rule}</p>
                  </div>
                </div>

                {/* Evidence Section */}
                <div className="mb-4 bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1">EVIDENCE</p>
                      <p className="text-sm text-gray-800 italic">"{result.evidence}"</p>
                    </div>
                  </div>
                </div>

                {/* Reasoning Section */}
                <div className="mb-4">
                  <div className="flex items-start">
                    <FileText className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1">REASONING</p>
                      <p className="text-sm text-gray-700">{result.reasoning}</p>
                    </div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">CONFIDENCE SCORE</span>
                    <span className="text-sm font-bold text-gray-900">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ease-out animate-fadeIn ${
                        result.confidence >= 70
                          ? 'bg-gradient-to-r from-green-400 to-green-600'
                          : result.confidence >= 40
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Analysis Complete</span>
            <div className="flex items-center space-x-4">
              <span className="text-green-700 font-semibold">{passCount} Passed</span>
              <span className="text-gray-300">•</span>
              <span className="text-red-700 font-semibold">{failCount} Failed</span>
              <span className="text-gray-300">•</span>
              <span className="text-blue-700 font-semibold">{avgConfidence}% Avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;