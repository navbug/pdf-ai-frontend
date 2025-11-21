import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const RuleInput = ({ label, value, onChange, placeholder, error }) => {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <span className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center text-xs font-bold mr-2">
          {label.slice(-1)}
        </span>
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-smooth bg-white/50 backdrop-blur-sm placeholder:text-gray-400 group-hover:border-gray-400 input-glow ${
            error ? 'border-red-500' : 'border-gray-200'
          } ${value ? 'border-indigo-300' : ''}`}
        />
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default RuleInput;