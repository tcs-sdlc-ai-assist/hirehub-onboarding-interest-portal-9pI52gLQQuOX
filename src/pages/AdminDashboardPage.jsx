import React, { useState, useEffect, useContext } from 'react';
import { Table } from '../components/Table.jsx';
import { CTAButton } from '../components/CTAButton.jsx';
import { FeedbackBanner } from '../components/FeedbackBanner.jsx';
import { ConfirmationDialog } from '../components/ConfirmationDialog.jsx';
import { FeedbackContext } from '../components/FeedbackContext.jsx';
import { SubmissionRepository } from '../services/SubmissionRepository.js';
import { DEPARTMENTS } from '../services/Validation.js';

/**
 * AdminDashboardPage
 * Protected admin dashboard for managing candidate submissions.
 */
function AdminDashboardPage() {
  const { showSuccess, showError, hideBanner, banner } = useContext(FeedbackContext);

  // Submissions state
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editModal, setEditModal] = useState({
    open: false,
    submission: null,
    form: null,
    errors: {}
  });

  // Delete confirmation state
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    submission: null
  });

  // Load submissions on mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSubmissions(SubmissionRepository.getAll());
      setLoading(false);
    }, 300);
  }, []);

  // Refresh submissions after CRUD
  function refreshSubmissions() {
    setSubmissions(SubmissionRepository.getAll());
  }

  // Stats
  const stats = React.useMemo(() => {
    const total = submissions.length;
    const byDept = {};
    DEPARTMENTS.forEach(dep => {
      byDept[dep] = submissions.filter(s => s.department === dep).length;
    });
    return { total, byDept };
  }, [submissions]);

  // Table columns
  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'department', label: 'Department' },
    { key: 'submittedOn', label: 'Submitted On' }
  ];

  // Format date
  function formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return iso;
    }
  }

  // Actions
  const actions = [
    {
      label: 'Edit',
      onClick: submission => handleEditOpen(submission),
      color: '#388e3c'
    },
    {
      label: 'Delete',
      onClick: submission => handleDeleteOpen(submission),
      color: '#d32f2f'
    }
  ];

  // Edit modal handlers
  function handleEditOpen(submission) {
    setEditModal({
      open: true,
      submission,
      form: {
        fullName: submission.fullName,
        mobile: submission.mobile,
        department: submission.department
      },
      errors: {}
    });
    hideBanner();
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditModal(prev => ({
      ...prev,
      form: {
        ...prev.form,
        [name]: value
      },
      errors: {
        ...prev.errors,
        [name]: undefined
      }
    }));
  }

  function validateEditFields(form) {
    const errs = {};
    // Full Name
    if (!form.fullName.trim() || form.fullName.length > 100 || !/^[A-Za-z ]+$/.test(form.fullName.trim())) {
      errs.fullName = 'Full name is required, max 100 chars, letters/spaces only.';
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

  function handleEditSubmit(e) {
    e.preventDefault();
    const fieldErrors = validateEditFields(editModal.form);
    if (Object.keys(fieldErrors).length > 0) {
      setEditModal(prev => ({
        ...prev,
        errors: fieldErrors
      }));
      showError('Please correct the errors in the form.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = SubmissionRepository.edit(
        editModal.submission.email,
        {
          fullName: editModal.form.fullName.trim(),
          mobile: editModal.form.mobile.trim(),
          department: editModal.form.department
        }
      );
      setLoading(false);
      if (result.success) {
        showSuccess('Submission updated successfully.');
        setEditModal({ open: false, submission: null, form: null, errors: {} });
        refreshSubmissions();
      } else {
        showError(result.error || 'Edit failed.');
      }
    }, 400);
  }

  function handleEditClose() {
    setEditModal({ open: false, submission: null, form: null, errors: {} });
    hideBanner();
  }

  // Delete dialog handlers
  function handleDeleteOpen(submission) {
    setDeleteDialog({ open: true, submission });
    hideBanner();
  }

  function handleDeleteConfirm() {
    setLoading(true);
    setTimeout(() => {
      const result = SubmissionRepository.delete(deleteDialog.submission.email);
      setLoading(false);
      if (result.success) {
        showSuccess('Submission deleted.');
        setDeleteDialog({ open: false, submission: null });
        refreshSubmissions();
      } else {
        showError(result.error || 'Delete failed.');
      }
    }, 400);
  }

  function handleDeleteCancel() {
    setDeleteDialog({ open: false, submission: null });
    hideBanner();
  }

  // Render
  return (
    <div className="app-container" style={{ marginTop: 32 }}>
      <h1>Admin Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: 18 }}>
        Review, edit, or delete candidate submissions. All actions update instantly.
      </p>
      {banner && (
        <FeedbackBanner
          type={banner.type}
          message={banner.message}
          onClose={hideBanner}
        />
      )}

      {/* Stats */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#2d6ee0'
            }}>{stats.total}</span>
            <span style={{
              fontSize: '1rem',
              color: '#222',
              marginLeft: 8
            }}>Total Submissions</span>
          </div>
          {DEPARTMENTS.map(dep => (
            <div key={dep} style={{ minWidth: 120 }}>
              <span style={{
                fontWeight: 600,
                color: '#388e3c',
                fontSize: '1.05rem'
              }}>{stats.byDept[dep]}</span>
              <span style={{
                fontSize: '0.97rem',
                color: '#555',
                marginLeft: 6
              }}>{dep}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div>
        {loading ? (
          <div className="text-center" style={{ margin: '32px 0' }}>
            <span className="loader" />
            <div className="mt-1 text-muted">Loading submissions...</div>
          </div>
        ) : (
          <Table
            columns={columns.map(col =>
              col.key === 'submittedOn'
                ? { ...col, label: 'Submitted On' }
                : col
            )}
            data={submissions.map(s => ({
              ...s,
              submittedOn: formatDate(s.submittedOn)
            }))}
            actions={actions}
            emptyMessage="No candidate submissions yet."
          />
        )}
      </div>

      {/* Edit Modal */}
      {editModal.open && (
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
              minWidth: 340,
              maxWidth: 420,
              background: '#fff',
              boxShadow: '0 4px 24px rgba(34,38,54,0.13)',
              borderRadius: 8,
              padding: 28,
              position: 'relative'
            }}
          >
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#2d6ee0' }}>
              Edit Submission
            </h2>
            <form onSubmit={handleEditSubmit} autoComplete="off" noValidate>
              {/* Full Name */}
              <label htmlFor="editFullName">Full Name</label>
              <input
                type="text"
                id="editFullName"
                name="fullName"
                value={editModal.form.fullName}
                onChange={handleEditChange}
                placeholder="e.g. Jane Doe"
                disabled={loading}
                autoFocus
              />
              {editModal.errors.fullName && (
                <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
                  {editModal.errors.fullName}
                </div>
              )}

              {/* Mobile */}
              <label htmlFor="editMobile">Mobile Number</label>
              <input
                type="tel"
                id="editMobile"
                name="mobile"
                value={editModal.form.mobile}
                onChange={handleEditChange}
                placeholder="e.g. 9876543210"
                disabled={loading}
              />
              {editModal.errors.mobile && (
                <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
                  {editModal.errors.mobile}
                </div>
              )}

              {/* Department */}
              <label htmlFor="editDepartment">Department</label>
              <select
                id="editDepartment"
                name="department"
                value={editModal.form.department}
                onChange={handleEditChange}
                disabled={loading}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
              {editModal.errors.department && (
                <div className="error-message" style={{ marginBottom: 8, fontSize: '0.98rem' }}>
                  {editModal.errors.department}
                </div>
              )}

              {/* Email (read-only) */}
              <label htmlFor="editEmail">Email (read-only)</label>
              <input
                type="email"
                id="editEmail"
                name="email"
                value={editModal.submission.email}
                disabled
                style={{ background: '#e3e6eb', color: '#888' }}
              />

              {/* Submit */}
              <div className="mt-2 text-right">
                <CTAButton
                  type="button"
                  style={{
                    background: '#d1d5db',
                    color: '#222',
                    marginRight: 8
                  }}
                  onClick={handleEditClose}
                  disabled={loading}
                >
                  Cancel
                </CTAButton>
                <CTAButton
                  type="submit"
                  style={{
                    background: '#2d6ee0'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="loader" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </CTAButton>
              </div>
            </form>
            <button
              type="button"
              aria-label="Close"
              onClick={handleEditClose}
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
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialog.open && (
        <ConfirmationDialog
          message={
            `Are you sure you want to delete the submission for "${deleteDialog.submission.fullName}" (${deleteDialog.submission.email})? This action cannot be undone.`
          }
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      )}
    </div>
  );
}

export { AdminDashboardPage };