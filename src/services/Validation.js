// src/services/Validation.js

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Design',
  'Product'
];

function isValidName(name) {
  if (typeof name !== 'string') return false;
  if (!name.trim()) return false;
  if (name.length > 100) return false;
  // Only letters and spaces
  return /^[A-Za-z ]+$/.test(name.trim());
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  if (!email.trim()) return false;
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidMobile(mobile) {
  if (typeof mobile !== 'string') return false;
  // Remove spaces, dashes, etc.
  const digits = mobile.replace(/\D/g, '');
  return /^\d{10}$/.test(digits);
}

function isValidDepartment(department) {
  return DEPARTMENTS.includes(department);
}

/**
 * Validates a candidate submission object.
 * @param {Object} submission
 * @param {boolean} [isEdit=false] - If true, email uniqueness is not checked.
 * @returns {Object} ValidationResult: { valid, errors }
 */
function validateSubmission(submission, isEdit = false) {
  const errors = {};

  // Full Name
  if (!isValidName(submission.fullName)) {
    errors.fullName = 'Full name is required, max 100 characters, letters and spaces only.';
  }

  // Email
  if (!isValidEmail(submission.email)) {
    errors.email = 'A valid email address is required.';
  }

  // Mobile
  if (!isValidMobile(submission.mobile)) {
    errors.mobile = 'Mobile number must be 10 digits.';
  }

  // Department
  if (!isValidDepartment(submission.department)) {
    errors.department = 'Please select a valid department.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export {
  validateSubmission,
  DEPARTMENTS
};