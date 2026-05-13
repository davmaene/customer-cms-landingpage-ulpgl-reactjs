import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const FiAlertTriangleIcon = FiAlertTriangle as any;

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div
        className="dash-modal-container"
        style={{ maxWidth: "420px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dash-confirm-content">
          <div className="dash-confirm-icon">
            <FiAlertTriangleIcon size={32} />
          </div>
          <h5 className="dash-confirm-title">{title}</h5>
          <p className="dash-confirm-message">{message}</p>
          <div className="dash-confirm-actions">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Annuler
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
