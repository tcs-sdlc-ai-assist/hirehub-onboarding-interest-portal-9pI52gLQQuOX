import React from 'react';
import { CTAButton } from './CTAButton.jsx';

/**
 * ConfirmationDialog
 * Props:
 *   - message: string
 *   - onConfirm: function
 *   - onCancel: function
 *   - confirmLabel: string (optional, default: 'Confirm')
 *   - cancelLabel: string (optional, default: 'Cancel')
 */
function ConfirmationDialog({
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel'
}) {
  // Trap focus for accessibility (simple modal)
  React.useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        if (typeof onCancel === 'function') onCancel();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        background: 'rgba(34, 38, 54, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="card"
        style={{
          minWidth: 320,
          maxWidth: 400,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(34,38,54,0.13)',
          borderRadius: 8,
          padding: 28,
          position: 'relative'
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#d32f2f' }}>
          Confirm Action
        </h2>
        <p style={{ marginBottom: 24, color: '#222', fontSize: '1rem', lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <CTAButton
            type="button"
            style={{
              background: '#d1d5db',
              color: '#222'
            }}
            onClick={onCancel}
          >
            {cancelLabel}
          </CTAButton>
          <CTAButton
            type="button"
            style={{
              background: '#d32f2f'
            }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </CTAButton>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: '1.3rem',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export { ConfirmationDialog };