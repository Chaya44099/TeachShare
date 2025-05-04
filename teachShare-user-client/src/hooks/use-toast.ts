// צרי תיקייה בשם hooks ובתוכה קובץ use-toast.ts
// src/hooks/use-toast.ts

import { useState } from 'react';

export function useToast() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const toast = ({ 
    title = '', 
    description = '', 
    variant = 'default' 
  }: { 
    title?: string; 
    description: string; 
    variant?: 'default' | 'destructive' 
  }) => {
    setMessage(description || title);
    setSeverity(variant === 'destructive' ? 'error' : 'success');
    setOpen(true);
  };

  return {
    toast,
    open,
    setOpen,
    message,
    severity
  };
}