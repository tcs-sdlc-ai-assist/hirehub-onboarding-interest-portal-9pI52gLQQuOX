/**
 * @typedef {Object} Submission
 * @property {string} id - Unique identifier for the submission
 * @property {string} candidateName - Name of the candidate
 * @property {string} email - Candidate's email address
 * @property {string} status - Current status ('pending', 'approved', 'rejected')
 * @property {string} [submittedAt] - ISO date string when submitted
 * @property {string} [feedback] - Feedback provided for the submission
 */

/**
 * @typedef {Object} Feedback
 * @property {string} submissionId - ID of the submission being reviewed
 * @property {string} reviewerName - Name of the reviewer
 * @property {string} comments - Feedback comments
 * @property {number} rating - Numeric rating (1-5)
 * @property {string} [createdAt] - ISO date string when feedback was given
 */

/**
 * @typedef {Object} ErrorMessage
 * @property {string} message - Error message text
 * @property {string} [code] - Optional error code
 */

/**
 * @typedef {Object} SuccessMessage
 * @property {string} message - Success message text
 */

/**
 * @typedef {Object} LoaderProps
 * @property {boolean} loading - Whether loading is active
 * @property {string} [text] - Optional loading text
 */

/**
 * @typedef {Object} ButtonProps
 * @property {string} children - Button label
 * @property {function} onClick - Click handler
 * @property {boolean} [disabled] - Whether button is disabled
 * @property {string} [type] - Button type ('button', 'submit', etc.)
 */

/**
 * @typedef {Object} InputProps
 * @property {string} value - Input value
 * @property {function} onChange - Change handler
 * @property {string} [type] - Input type ('text', 'email', etc.)
 * @property {string} [placeholder] - Placeholder text
 * @property {boolean} [disabled] - Whether input is disabled
 * @property {string} [name] - Input name
 * @property {string} [label] - Input label
 */