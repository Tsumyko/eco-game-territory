import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className = ''
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[85vh] overflow-auto ${className}`}>
          {title && (
            <Dialog.Title className="text-lg font-semibold mb-2">
              {title}
            </Dialog.Title>
          )}
          
          {description && (
            <Dialog.Description className="text-gray-600 mb-4">
              {description}
            </Dialog.Description>
          )}
          
          {children}
          
          <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X size={20} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;