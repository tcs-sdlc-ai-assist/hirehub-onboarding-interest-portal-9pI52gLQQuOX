import React, { useState, useContext } from 'react';
import { CTAButton } from '../components/CTAButton.jsx';
import { FeedbackBanner } from '../components/FeedbackBanner.jsx';
import { FeedbackContext } from '../components/FeedbackContext.jsx';
import { SubmissionRepository } from '../services/SubmissionRepository.js';
import { DEPARTMENTS } from '../services/Validation.js';

function InterestFormPage() {
  const { showSuccess, showError, hideBanner, banner } = useContext(FeedbackContext);

  // Form state
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }

  // Validate fields
  function validateFields() {
    const errs = {};
    // Full Name
    if (!form.fullName.trim() || form.fullName.length > 100 || !/^[A-Za-z ]+$/.test(form.fullName.trim())) {
      errs.fullName = 'Full name is required, max 100 chars, letters/spaces only.';
    }
    // Email
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'A valid email address is required.';
    }
    // Mobile
    const digits = form.mobile.replace(/\D/g, '');
    if (!/^\d{10}$/.test(digits)) {
      errs.mobile = 'Mobile number must be 10 digits.';
    }
    // Department
    if (!DEPARTMENTS.includes(form.department)) {
      errs.department = 'Please select a valid department.';
    }
    return errs;
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    hideBanner();
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      showError('Please correct the errors in the form.');
      return;
    }
    setLoading(true);
    // Check duplicate and add
    setTimeout(() => {
      const result = SubmissionRepository.add({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        department: form.department
      });
      setLoading(false);
      if (result.success) {
        showSuccess('Your application has been submitted successfully!');
        setForm({
          fullName: '',
          email: '',
          mobile: '',
          department: ''
        });
      } else {
        showError(result.error || 'Submission failed.');
      }
    }, 400);
  }

  // Render
  return (
    <div className="app-container" style={{ marginTop: 32 }}>
      <h1>Apply for Open Positions</h1>
      <p className="text-muted" style={{ marginBottom: 18 }}>
        Submit your interest for a role at HireHub. No account required. All fields are required.
      </p>
      {banner && (
        <FeedbackBanner
          type={banner.type}
          message={banner.message}
          onClose={hideBanner}
        />
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          margin: '0 auto',
          background: '#f9fafc',
          borderRadius: 8,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          padding: 28
        }}
        autoComplete="off"
        noValidate
      >
        {/* Full Name */}
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="e.g. Jane Doe"
          disabled={loading}
          autoFocus
        />
        {errors.fullName && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.fullName}
          </div>
        )}

        {/* Email */}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="e.g. jane@example.com"
          disabled={loading}
        />
        {errors.email && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.email}
          </div>
        )}

        {/* Mobile */}
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          disabled={loading}
        />
        {errors.mobile && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.mobile}
          </div>
        )}

        {/* Department */}
        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={form.department}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">Select department</option>
          {DEPARTMENTS.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {errors.department && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.department}
          </div>
        )}

        {/* Submit */}
        <div className="mt-2 text-center">
          <CTAButton
            type="submit"
            disabled={loading}
            style={{
              fontSize: '1.05rem',
              padding: '0.7em 2em'
            }}
          >
            {loading ? (
              <span>
                <span className="loader" style={{ width: 22, height: 22, marginRight: 8, verticalAlign: 'middle' }} />
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </CTAButton>
        </div>
      </form>
      <div className="text-center mt-3 text-muted" style={{ fontSize: '0.97rem' }}>
        Already applied? For updates, contact HR at <span style={{ color: '#2d6ee0', fontWeight: 500 }}>hr@hirehub.com</span>.
      </div>
    </div>
  );
}

export { InterestFormPage };