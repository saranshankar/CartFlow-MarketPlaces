import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  message?: string;
  id?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, id }) => {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      data-testid="validation-message"
      className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm animate-fadeIn"
    >
      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
