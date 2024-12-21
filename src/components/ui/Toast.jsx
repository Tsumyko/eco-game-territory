import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertDialog.Content 
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border ${backgrounds[type]} flex items-center gap-3 max-w-sm animate-in fade-in slide-in-from-right`}
        >
          {icons[type]}
          <span className="flex-1">{message}</span>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Toast;