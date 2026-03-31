import React from 'react';

/**
 * FeatureCard
 * Props:
 *   - icon: JSX.Element (optional)
 *   - title: string
 *   - description: string
 */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      {icon && (
        <span
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#e3e6eb',
            borderRadius: '50%',
            marginRight: 8
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#1a2233' }}>{title}</h3>
        <p style={{ margin: 0, color: '#555', fontSize: '1rem', lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
  );
}

export { FeatureCard };