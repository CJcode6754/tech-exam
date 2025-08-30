import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-700 hover:text-red-900 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};