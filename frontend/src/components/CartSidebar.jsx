import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const TAX_RATE = 0.0875;

export default function CartSidebar() {
  const { cart, cartOpen, cartTotal, setCartOpen, removeFromCart, updateQty, clearCart } = useApp();
  const navigate = useNavigate();
  const tax = cartTotal * TAX_RATE;
  const grandTotal = cartTotal + tax;

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setCartOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={() => setCartOpen(false)} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1100,
        opacity: cartOpen ? 1 : 0,
        pointerEvents: cartOpen ? 'all' : 'none',
        transition: 'opacity 0.4s var(--ease-out)',
      }}/>

      {/* Drawer */}
      <aside style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: 460,
        maxWidth: '100vw',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10,10,14,0.97)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s var(--ease-out)',
        boxShadow: '-32px 0 80px rgba(0,0,0,0.7)',
      }}>

        {/* Header */}
        <div style={{
          padding: '28px 32px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '3.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
              MY GARAGE
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--white)' }}>
              {cart.length} {cart.length === 1 ? 'Vehicle' : 'Vehicles'}
            </h2>
          </div>

          <button onClick={() => setCartOpen(false)} style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'var(--white-40)',
            fontSize: 16, cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s',
          }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {cart.length === 0 ? <EmptyState /> : cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
              onQtyChange={(qty) => updateQty(item.id, qty)}
              onNavigate={() => { setCartOpen(false); navigate(`/car/${item.id}`); }}
            />
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 32px 28px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}>

            {/* Summary lines */}
            {[
              { label: 'Subtotal', value: fmt(cartTotal) },
              { label: `Est. Tax (${(TAX_RATE * 100).toFixed(2)}%)`, value: fmt(tax) },
              { label: 'Delivery & Registration', value: 'TBD at checkout' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: 'var(--white-40)' }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--white-70)' }}>{value}</span>
              </div>
            ))}

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--white)' }}>
                Total (Est.)
              </span>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{fmt(grandTotal)}</span>
            </div>

            <button
              onClick={() => {
                setCartOpen(false);
                navigate('/checkout');
              }}
              className="btn btn-gold"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 12, fontSize: 12 }}
            >
              Proceed to Purchase
            </button>

            <button
              onClick={clearCart}
              style={{
                width: '100%', padding: '12px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--white-20)', fontFamily: 'var(--font-ui)',
                fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                cursor: 'none', transition: 'all 0.25s',
              }}
            >
              Clear Garage
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItem({ item, onRemove, onQtyChange, onNavigate }) {
  return (
    <div>
      {/* نفس الكود زي ما هو */}
    </div>
  );
}

function EmptyState() {
  return (
    <div>
      {/* نفس الكود زي ما هو */}
    </div>
  );
}