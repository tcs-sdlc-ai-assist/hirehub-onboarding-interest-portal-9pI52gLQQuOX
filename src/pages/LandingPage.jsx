import React from 'react';
import { FeatureCard } from '../components/FeatureCard.jsx';
import { CTAButton } from '../components/CTAButton.jsx';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  // Feature icons (simple SVGs)
  const iconApply = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="4" fill="#2d6ee0" />
      <path d="M10 14h8M10 18h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" fill="#fff"/>
    </svg>
  );
  const iconAdmin = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="4" fill="#388e3c" />
      <path d="M14 10v8M10 14h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  const iconFeedback = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="4" fill="#d32f2f" />
      <path d="M10 18l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="14" cy="10" r="2" fill="#fff"/>
    </svg>
  );

  return (
    <div className="app-container" style={{ marginTop: 32 }}>
      {/* Hero */}
      <section className="text-center" style={{ marginBottom: 36 }}>
        <h1>
          Welcome to HireHub Onboarding Portal
        </h1>
        <p className="text-muted" style={{ fontSize: '1.18rem', marginBottom: 28 }}>
          Streamline your hiring journey. Apply for open roles or manage candidate submissions—all in one place.
        </p>
        <CTAButton
          style={{ fontSize: '1.1rem', padding: '0.8em 2em', marginBottom: 8 }}
          onClick={() => navigate('/apply')}
        >
          Apply Now
        </CTAButton>
      </section>

      {/* Features */}
      <section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
          marginBottom: 32
        }}>
          <FeatureCard
            icon={iconApply}
            title="Easy Application"
            description="Submit your interest in open positions with a simple, secure form. No account required."
          />
          <FeatureCard
            icon={iconAdmin}
            title="Admin Dashboard"
            description="HR/Admins can review, edit, or delete candidate submissions. Protected access for privacy."
          />
          <FeatureCard
            icon={iconFeedback}
            title="Instant Feedback"
            description="Get clear success or error messages for every action. No page reloads, no confusion."
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center" style={{ marginTop: 36 }}>
        <h2 style={{ marginBottom: 12 }}>
          Ready to join HireHub?
        </h2>
        <CTAButton
          style={{ fontSize: '1.05rem', padding: '0.7em 1.8em' }}
          onClick={() => navigate('/apply')}
        >
          Start Your Application
        </CTAButton>
        <p className="text-muted mt-2" style={{ fontSize: '0.98rem' }}>
          For HR/Admin access, <span style={{ color: '#2d6ee0', fontWeight: 500 }}>login</span> above.
        </p>
      </section>
    </div>
  );
}

export { LandingPage };