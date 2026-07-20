import React from 'react';
import { useApp } from '../context/AppContext';

const ICONS = {
  success: '✓',
  info:    'ℹ',
  warning: '⚠',
  error:   '✕',
};
const COLORS = {
  success: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.35)', icon: '#4ADE80' },
  info:    { bg: 'rgba(99,179,237,0.12)', border: 'rgba(99,179,237,0.35)', icon: '#63B3ED' },
  warning: { bg: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.40)', icon: 'var(--gold)' },
  error:   { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', icon: 'var(--red)' },
};

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: 32,
      zIndex: 9000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  const type = toast.type || 'info';
  const c = COLORS[type] || COLORS.info;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      background: `rgba(10,10,14,0.95)`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${c.icon}`,
      borderRadius: 'var(--radius-md)',
      minWidth: 280,
      maxWidth: 360,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      animation: 'toastIn 0.4s var(--ease-out) both',
      pointerEvents: 'all',
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: c.bg, border: `1px solid ${c.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: c.icon, fontSize: 12, fontWeight: 700,
        flexShrink: 0,
      }}>{ICONS[type]}</span>

      <p style={{
        flex: 1,
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--white-70)',
        lineHeight: 1.4,
      }}>{toast.message}</p>

      <button onClick={onRemove} style={{
        background: 'none', border: 'none',
        color: 'var(--white-20)', fontSize: 12,
        cursor: 'none', padding: '2px 4px',
        transition: 'color 0.2s', lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--white-70)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--white-20)'}
      >✕</button>
    </div>
  );
}