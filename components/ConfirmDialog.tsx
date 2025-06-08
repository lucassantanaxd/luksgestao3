import React from 'react';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-slate-300 mb-8 text-lg leading-relaxed">{message}</p>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 transition-all duration-300 focus-ring font-medium"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="btn-animate px-6 py-3 rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 focus-ring font-medium shadow-lg hover:shadow-xl"
        >
          ⚠️ Confirmar Exclusão
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;