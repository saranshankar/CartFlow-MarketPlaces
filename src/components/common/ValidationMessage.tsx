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
      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-terracottared-100/80 border border-terracottared-600/30 text-terracottared-700 text-xs sm:text-sm animate-fadeIn"
    >
      <AlertCircle className="w-4 h-4 text-terracottared-600 shrink-0 mt-0.5" aria-hidden="true" />
      <span className="font-medium leading-relaxed">{message}</span>
    </div>
  );
};
