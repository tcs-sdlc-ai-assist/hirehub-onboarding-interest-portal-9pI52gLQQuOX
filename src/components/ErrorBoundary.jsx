import React from 'react';
import { FeedbackBanner } from './FeedbackBanner.jsx';

/**
 * ErrorBoundary
 * Catches UI errors and renders fallback UI.
 * Props:
 *   - children: JSX.Element
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log error to console for observability
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
    // Optionally reload page for recovery
    // window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="app-container" style={{ marginTop: 48 }}>
          <FeedbackBanner
            type="error"
            message={
              'Something went wrong. Please try again or reload the page.\n' +
              (this.state.error && this.state.error.message
                ? ' (' + this.state.error.message + ')'
                : '')
            }
            onClose={this.handleReset}
          />
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              className="button"
              type="button"
              onClick={this.handleReset}
              style={{ background: '#2d6ee0', fontSize: '1rem' }}
            >
              Dismiss
            </button>
            <button
              className="button"
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: '#d32f2f',
                marginLeft: 12,
                fontSize: '1rem'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };