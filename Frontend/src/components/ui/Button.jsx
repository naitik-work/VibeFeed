import React from 'react';
import './Button.scss';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg' | 'icon'
  isLoading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`vibe-btn vibe-btn--${variant} vibe-btn--${size} ${isLoading ? 'is-loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="vibe-btn__spinner" />
      ) : (
        <>
          {leftIcon && <span className="vibe-btn__icon vibe-btn__icon--left">{leftIcon}</span>}
          {children && <span className="vibe-btn__text">{children}</span>}
          {rightIcon && <span className="vibe-btn__icon vibe-btn__icon--right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
