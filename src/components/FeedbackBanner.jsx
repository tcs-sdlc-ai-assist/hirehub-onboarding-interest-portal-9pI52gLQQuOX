import React, { useEffect } from 'react';

/**
 * FeedbackBanner
 * Props:
 *   - type: 'success' | 'error'
 *   - message: string
 *   - onClose?: function
 * 
 * Auto-dismisses after 4s if type === 'success'
 */
function FeedbackBanner({ type, message, onClose }) {
  useEffect(() => {
    if (type === 'success' && typeof onClose === 'function') {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  if (!message) return null;

  const className =
    type === 'success'
      ? 'success-message'
      : 'error-message';

  return (
    <div className={className} role="alert" style={{ position: 'relative' }}>
      {message}
      {typeof onClose === 'function' && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export { FeedbackBanner };