import React from 'react';

/**
 * CTAButton
 * Props:
 *   - children: string (button label)
 *   - onClick: function (optional)
 *   - type: string ('button' | 'submit' | etc, optional)
 *   - style: object (optional inline styles)
 *   - disabled: boolean (optional)
 */
function CTAButton({ children, onClick, type = 'button', style, disabled }) {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { CTAButton };