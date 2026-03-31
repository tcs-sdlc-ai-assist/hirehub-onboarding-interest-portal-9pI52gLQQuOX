// src/services/SessionManager.js

const SESSION_KEY = 'hirehub_admin_auth';

// Hardcoded admin credentials (demo scope)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'hirehub2024';

/**
 * SessionManager: Handles admin authentication/session state.
 */
const SessionManager = {
  /**
   * Attempt admin login.
   * @param {string} username
   * @param {string} password
   * @returns {Object} { success, error? }
   */
  login(username, password) {
    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password.trim()
    ) {
      return { success: false, error: 'Username and password are required.' };
    }
    if (
      username.trim().toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials.' };
  },

  /**
   * Logout admin (clear session).
   */
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  /**
   * Is admin currently logged in?
   * @returns {boolean}
   */
  isAdmin() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }
};

export { SessionManager };