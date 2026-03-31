// src/services/SubmissionRepository.js

import { validateSubmission } from './Validation.js';

const STORAGE_KEY = 'hirehub_submissions';

/**
 * Defensive parse of localStorage submissions array.
 * Returns [] if corrupted or missing.
 */
function _loadAll() {
  let raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) throw new Error('Not array');
    return arr.map(s => ({ ...s }));
  } catch (e) {
    console.error('[SubmissionRepository] Corrupted localStorage, resetting:', e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

/**
 * Save array to localStorage.
 */
function _saveAll(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/**
 * Case-insensitive email match.
 */
function _findIndexByEmail(arr, email) {
  return arr.findIndex(
    s => typeof s.email === 'string' && s.email.toLowerCase() === email.toLowerCase()
  );
}

/**
 * SubmissionRepository: CRUD for candidate submissions.
 */
const SubmissionRepository = {
  /**
   * Get all submissions.
   * @returns {Array} Array of submission objects.
   */
  getAll() {
    return _loadAll();
  },

  /**
   * Add a new submission.
   * @param {Object} submission
   * @returns {Object} { success, error? }
   */
  add(submission) {
    // Validate
    const result = validateSubmission(submission);
    if (!result.valid) {
      return {
        success: false,
        error: 'Invalid data: ' + JSON.stringify(result.errors)
      };
    }
    let all = _loadAll();
    if (_findIndexByEmail(all, submission.email) !== -1) {
      return {
        success: false,
        error: 'A submission with this email already exists.'
      };
    }
    const newSubmission = {
      ...submission,
      submittedOn: new Date().toISOString()
    };
    all.push(newSubmission);
    try {
      _saveAll(all);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Storage error' };
    }
  },

  /**
   * Edit an existing submission.
   * @param {string} email - Email of submission to edit.
   * @param {Object} updates - Partial fields to update.
   * @returns {Object} { success, error? }
   */
  edit(email, updates) {
    let all = _loadAll();
    const idx = _findIndexByEmail(all, email);
    if (idx === -1) {
      return { success: false, error: 'Submission not found.' };
    }
    // Email is read-only
    const updated = { ...all[idx], ...updates, email: all[idx].email };
    const result = validateSubmission(updated, true);
    if (!result.valid) {
      return {
        success: false,
        error: 'Invalid data: ' + JSON.stringify(result.errors)
      };
    }
    all[idx] = updated;
    try {
      _saveAll(all);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Storage error' };
    }
  },

  /**
   * Delete a submission by email.
   * @param {string} email
   * @returns {Object} { success, error? }
   */
  delete(email) {
    let all = _loadAll();
    const idx = _findIndexByEmail(all, email);
    if (idx === -1) {
      return { success: false, error: 'Submission not found.' };
    }
    all.splice(idx, 1);
    try {
      _saveAll(all);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Storage error' };
    }
  },

  /**
   * Reset corrupted storage (sets to empty array).
   */
  reset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export { SubmissionRepository };