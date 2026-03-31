import React, { useState, useContext } from 'react';
import { CTAButton } from '../components/CTAButton.jsx';
import { FeedbackBanner } from '../components/FeedbackBanner.jsx';
import { FeedbackContext } from '../components/FeedbackContext.jsx';
import { SessionManager } from '../services/SessionManager.js';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const { showSuccess, showError, hideBanner, banner } = useContext(FeedbackContext);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  function validateFields() {
    const errs = {};
    if (!form.username.trim()) {
      errs.username = 'Username is required.';
    }
    if (!form.password.trim()) {
      errs.password = 'Password is required.';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    hideBanner();
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      showError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = SessionManager.login(form.username.trim(), form.password);
      setLoading(false);
      if (result.success) {
        showSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin');
        }, 800);
      } else {
        showError(result.error || 'Login failed.');
      }
    }, 400);
  }

  return (
    <div className="app-container" style={{ marginTop: 48, maxWidth: 420 }}>
      <h1>Admin Login</h1>
      <p className="text-muted" style={{ marginBottom: 18 }}>
        HR/Admin access only. Enter credentials to manage candidate submissions.
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
          background: '#f9fafc',
          borderRadius: 8,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          padding: 28
        }}
        autoComplete="off"
        noValidate
      >
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="admin"
          disabled={loading}
          autoFocus
        />
        {errors.username && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.username}
          </div>
        )}

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          disabled={loading}
        />
        {errors.password && (
          <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
            {errors.password}
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
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </CTAButton>
        </div>
      </form>
      <div className="text-center mt-3 text-muted" style={{ fontSize: '0.97rem' }}>
        Demo credentials: <span style={{ color: '#2d6ee0', fontWeight: 500 }}>admin / hirehub2024</span>
      </div>
    </div>
  );
}

export { AdminLoginPage };