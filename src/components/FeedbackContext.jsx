import React, { createContext, useState, useCallback } from 'react';

// FeedbackContext: provides global feedback banner state
const FeedbackContext = createContext();

/**
 * FeedbackProvider
 * Manages feedback banner state for success/error messages.
 * Usage:
 *   <FeedbackProvider>
 *     ...children...
 *   </FeedbackProvider>
 */
function FeedbackProvider({ children }) {
  // banner: { type: 'success' | 'error', message: string }
  const [banner, setBanner] = useState(null);

  // Show success banner (auto-dismiss after 4s)
  const showSuccess = useCallback(message => {
    setBanner({ type: 'success', message });
    setTimeout(() => setBanner(null), 4000);
  }, []);

  // Show error banner (manual dismiss)
  const showError = useCallback(message => {
    setBanner({ type: 'error', message });
  }, []);

  // Hide banner
  const hideBanner = useCallback(() => {
    setBanner(null);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        banner,
        showSuccess,
        showError,
        hideBanner
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export { FeedbackContext, FeedbackProvider };