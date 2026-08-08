"use client";

import toast from "react-hot-toast";
import Modal from "./Modal";

export default function ConfirmModal({ isOpen, onClose, title, message, onConfirm, confirmText = "Confirm", danger = false }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-6 text-sm leading-relaxed text-muted">{message}</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all ${
            danger ? "bg-danger hover:bg-red-600" : "bg-primary hover:bg-primary-light dark:bg-accent dark:text-primary dark:hover:bg-accent-hover"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

export function useConfirmAction() {
  return {
    deleteRoom: (onConfirm) => {
      toast.success("Room deleted successfully");
      onConfirm?.();
    },
    cancelBooking: (onConfirm) => {
      toast.success("Booking cancelled");
      onConfirm?.();
    },
  };
}
