import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.scss';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onInput,
  error,
  leftIcon,
  rightIcon,
  required = false,
  disabled = false,
  className = '',
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`vibe-input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="vibe-input-group__label">
          {label} {required && <span className="vibe-input-group__required">*</span>}
        </label>
      )}

      <div className="vibe-input-group__control">
        {leftIcon && <span className="vibe-input-group__icon vibe-input-group__icon--left">{leftIcon}</span>}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onInput={onInput}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`vibe-input ${leftIcon ? 'has-left-icon' : ''} ${isPassword || rightIcon ? 'has-right-icon' : ''}`}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            className="vibe-input-group__toggle-pwd"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : (
          rightIcon && <span className="vibe-input-group__icon vibe-input-group__icon--right">{rightIcon}</span>
        )}
      </div>

      {error ? (
        <span className="vibe-input-group__error">{error}</span>
      ) : helperText ? (
        <span className="vibe-input-group__helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
