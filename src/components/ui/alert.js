import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ children, variant = 'default', className = '' }) => {
  const baseClass = 'p-4 rounded-lg mb-4 flex items-center';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-900',
    destructive: 'bg-red-100 text-red-900',
    warning: 'bg-yellow-100 text-yellow-900',
    success: 'bg-green-100 text-green-900'
  };

  return (
    <div className={`${baseClass} ${variantClasses[variant]} ${className}`}>
      <AlertCircle className="w-5 h-5 mr-2" />
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = '' }) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
};