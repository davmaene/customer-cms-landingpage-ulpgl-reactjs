import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const FiXIcon = FiX as any;

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const widthMap = { sm: "440px", md: "600px", lg: "800px" };

  return (
    <div className="dash-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="dash-modal-container" style={{ maxWidth: widthMap[size] }}>
        <div className="dash-modal-header">
          <h5 className="dash-modal-title">{title}</h5>
          <button className="dash-modal-close" onClick={onClose}>
            <FiXIcon size={20} />
          </button>
        </div>
        <div className="dash-modal-body">{children}</div>
      </div>
    </div>
  );
};
