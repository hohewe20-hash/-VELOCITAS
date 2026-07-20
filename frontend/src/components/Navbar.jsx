import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NAV_LINKS = [
  { label: 'Collection', to: '/cars' },
  { label: 'Compare', to: '/compare' },
  { label: 'Favorites', to: '/favorites' },
   { label: 'Configurator', to: '/configurator' },
];

export default function Navbar() {
  const { cartCount, compareList, favorites, setCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 900,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        transition: 'background 0.5s var(--ease-out), border-color 0.5s, box-shadow 0.5s',
        background: scrolled
          ? 'rgba(5,5,7,0.90)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(32px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(32px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoMark />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '1px',
              color: 'var(--white)',
            }}>
              VELOCI<span style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>TAS</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, to }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: active ? 'var(--gold)' : 'var(--white-70)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 2,
                  transition: 'color 0.25s',
                }}>
                  {label}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: -2, left: 0, right: 0,
                      height: 1,
                      background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                    }}/>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Favorites count */}
            <Link to="/favorites" style={{
              ...iconBtnStyle,
              color: favorites.length > 0 ? 'var(--gold)' : 'var(--white-40)',
            }}>
              <HeartIcon />
              {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
            </Link>

            {/* Compare count */}
            <Link to="/compare" style={{
              ...iconBtnStyle,
              color: compareList.length > 0 ? 'var(--gold)' : 'var(--white-40)',
            }}>
              <CompareIcon />
              {compareList.length > 0 && <Badge>{compareList.length}</Badge>}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 20px',
                background: 'var(--gold-dim)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.3s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.25)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--gold-dim)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)';
              }}
            >
              <CartIcon /> GARAGE
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -8, right: -8,
                  width: 18, height: 18,
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: 'var(--black)',
                  fontFamily: 'var(--font-ui)',
                  animation: 'pulse 1.5s infinite',
                }}>{cartCount}</span>
              )}
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                flexDirection: 'column',
                gap: 5,
                padding: 4,
                cursor: 'none',
              }}
              className="mobile-burger"
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--white)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translateY(7px)'
                    : i === 2 ? 'rotate(-45deg) translateY(-7px)'
                    : 'scaleX(0)'
                    : 'none',
                }}/>
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 850,
          background: 'rgba(5,5,7,0.97)',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          animation: 'fadeIn 0.3s both',
        }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
              fontWeight: 300,
              color: 'var(--white)',
              textDecoration: 'none',
              letterSpacing: '2px',
              transition: 'color 0.25s',
            }}>{label}</Link>
          ))}
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 300,
            color: 'var(--white)',
            textDecoration: 'none',
          }}>Home</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

const iconBtnStyle = {
  position: 'relative',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 40, height: 40,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  textDecoration: 'none',
  transition: 'all 0.25s',
};

function Badge({ children }) {
  return (
    <span style={{
      position: 'absolute', top: -5, right: -5,
      width: 16, height: 16,
      background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 8, fontWeight: 700, color: 'var(--black)',
      fontFamily: 'var(--font-ui)',
    }}>{children}</span>
  );
}

function LogoMark() {
  return (
    <div style={{
      width: 34, height: 34,
      background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 15, fontWeight: 700, color: 'var(--black)',
    }}>V</div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function CompareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}