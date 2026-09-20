import React from 'react';
import './EmptyState.scss';
import Button from './Button';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`vibe-empty-state ${className}`}>
      {icon && <div className="vibe-empty-state__icon">{icon}</div>}
      <h3 className="vibe-empty-state__title">{title}</h3>
      {description && <p className="vibe-empty-state__description">{description}</p>}
      {actionLabel && onAction && (
        <div className="vibe-empty-state__action">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
