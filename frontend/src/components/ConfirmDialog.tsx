import React from "react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
          Yes
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
