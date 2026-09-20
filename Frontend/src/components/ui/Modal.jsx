import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.scss';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="vibe-modal-overlay" onClick={onClose}>
      <div
        className={`vibe-modal vibe-modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {(title || showClose) && (
          <div className="vibe-modal__header">
            <div className="vibe-modal__title-group">
              {title && <h3 className="vibe-modal__title">{title}</h3>}
              {subtitle && <p className="vibe-modal__subtitle">{subtitle}</p>}
            </div>
            {showClose && (
              <button
                className="vibe-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="vibe-modal__body">{children}</div>

        {footer && <div className="vibe-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
