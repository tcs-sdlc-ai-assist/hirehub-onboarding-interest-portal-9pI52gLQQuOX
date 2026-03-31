import React from 'react';

/**
 * Table
 * Props:
 *   - columns: Array<{ key: string, label: string }>
 *   - data: Array<Object>
 *   - actions: Array<{ label: string, onClick: (row) => void, color?: string }>
 *   - emptyMessage: string (optional)
 */
function Table({ columns, data, actions = [], emptyMessage }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: '#fff',
          fontSize: '1rem',
          minWidth: 600
        }}
      >
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  background: '#f7f8fa',
                  borderBottom: '2px solid #e3e6eb',
                  color: '#1a2233',
                  fontWeight: 600
                }}
              >
                {col.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th
                style={{
                  textAlign: 'right',
                  padding: '12px 8px',
                  background: '#f7f8fa',
                  borderBottom: '2px solid #e3e6eb',
                  color: '#1a2233',
                  fontWeight: 600
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                style={{
                  textAlign: 'center',
                  padding: '24px 8px',
                  color: '#7a869a'
                }}
              >
                {emptyMessage || 'No submissions found.'}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.email || idx}
                style={{
                  background: idx % 2 === 0 ? '#fafbfc' : '#fff'
                }}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding: '10px 8px',
                      borderBottom: '1px solid #e3e6eb',
                      color: '#222'
                    }}
                  >
                    {row[col.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td
                    style={{
                      textAlign: 'right',
                      padding: '10px 8px',
                      borderBottom: '1px solid #e3e6eb'
                    }}
                  >
                    {actions.map((action, aidx) => (
                      <button
                        key={aidx}
                        className="button"
                        style={{
                          marginLeft: aidx > 0 ? 8 : 0,
                          padding: '0.3em 1em',
                          fontSize: '0.95rem',
                          background: action.color || '#2d6ee0'
                        }}
                        type="button"
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Table };