import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SessionManager } from '../services/SessionManager.js';

function Header({ isAdmin, onLogout }) {
  const navigate = useNavigate();

  // Handle logout click
  const handleLogout = () => {
    SessionManager.logout();
    if (typeof onLogout === 'function') onLogout();
    navigate('/');
  };

  // Logo SVG (simple, accessible)
  const Logo = (
    <span
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: 10,
        width: 32,
        height: 32
      }}
      aria-label="HireHub Logo"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#2d6ee0" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Segoe UI, Arial, sans-serif"
        >
          HH
        </text>
      </svg>
    </span>
  );

  // Responsive nav links
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid #e3e6eb',
        boxShadow: '0 1px 6px rgba(0,0,0,0.03)'
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo + Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {Logo}
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#1a2233',
              letterSpacing: '0.02em'
            }}
          >
            HireHub Onboarding
          </span>
        </div>

        {/* Nav links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-active text-muted' : 'text-muted'
            }
            style={{
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              padding: '4px 0'
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              isActive ? 'nav-active text-muted' : 'text-muted'
            }
            style={{
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              padding: '4px 0'
            }}
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'nav-active text-muted' : 'text-muted'
            }
            style={{
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              padding: '4px 0'
            }}
          >
            Admin
          </NavLink>
          {/* Spacer */}
          <span style={{ width: 16 }} />
          {/* Login/Logout button */}
          {isAdmin ? (
            <button
              className="button"
              style={{
                padding: '0.4em 1em',
                fontSize: '0.97rem',
                fontWeight: 500,
                background: '#d32f2f'
              }}
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/admin"
              style={{
                textDecoration: 'none'
              }}
            >
              <button
                className="button"
                style={{
                  padding: '0.4em 1em',
                  fontSize: '0.97rem',
                  fontWeight: 500
                }}
                type="button"
              >
                Login
              </button>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export { Header };