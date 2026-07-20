import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';
import CustomCursor from './components/CustomCursor';
import AIAssistant from './components/AiAssistant';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import Configurator from './pages/Configurator';
import CheckoutPage from './pages/CheckoutPage';

import './index.css';

/* ══ SPLASH SCREEN ══ */
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter → hold → exit

  useEffect(() => {
    // Hold for 2s then start exit animation
    const t1 = setTimeout(() => setPhase('exit'), 2200);
    // Remove splash after exit animation finishes
    const t2 = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#050507',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'exit' ? 0 : 1,
      transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents: phase === 'exit' ? 'none' : 'all',
    }}>

      {/* Gold line top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: phase === 'enter' ? '100%' : '0%',
        height: 1,
        background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
        transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        transitionDelay: '0.2s',
      }}/>

      {/* Gold line bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: phase === 'enter' ? '100%' : '0%',
        height: 1,
        background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
        transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        transitionDelay: '0.2s',
      }}/>

      {/* Logo */}
      <div style={{
        textAlign: 'center',
        opacity: phase === 'enter' ? 1 : 0,
        transform: phase === 'enter' ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.6s, transform 0.6s',
        animation: 'splashLogoIn 0.9s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        {/* Shield / Emblem */}
        <div style={{ marginBottom: 24 }}>
          <svg width="64" height="72" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 2L4 14V38C4 53 16 65 32 70C48 65 60 53 60 38V14L32 2Z"
              fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <path d="M32 12L12 21V38C12 49 21 58 32 63C43 58 52 49 52 38V21L32 12Z"
              fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
            <text x="32" y="42" textAnchor="middle"
              fontFamily="serif" fontSize="18" fontWeight="700"
              fill="#C9A84C" letterSpacing="1">V</text>
          </svg>
        </div>

        {/* Brand name */}
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: 38,
          fontWeight: 400,
          letterSpacing: '12px',
          textTransform: 'uppercase',
          color: '#fff',
          marginBottom: 8,
        }}>
          VELOCI<span style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8D48B)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>TAS</span>
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.6)',
          marginBottom: 48,
        }}>
          MOTORS · EST. 2024
        </div>

        {/* Loading bar */}
        <div style={{
          width: 120, height: 1,
          background: 'rgba(255,255,255,0.08)',
          margin: '0 auto',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #C9A84C, #E8D48B)',
            animation: 'splashBar 1.8s cubic-bezier(0.4,0,0.2,1) forwards',
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashBar {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ══ ANIMATED ROUTES ══ */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} style={{ animation: 'pageFadeIn 0.55s cubic-bezier(0.22,1,0.36,1) both' }}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/configurator/:id" element={<Configurator />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

/* ══ APP ══ */
export default function App() {
  const [splash, setSplash] = useState(true);

  return (
    <AppProvider>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <Router>
        <CustomCursor />
        <Navbar />
        <CartSidebar />
        <Toast />
        <AIAssistant />
        <AnimatedRoutes />
      </Router>
    </AppProvider>
  );
}