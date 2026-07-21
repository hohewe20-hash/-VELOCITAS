import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useApp } from '../context/AppContext';
import ReactPlayer from 'react-player';

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useApp();
  const [loaded, setLoaded] = useState(false);
  const [addedPulse, setAddedPulse] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  const car = cars.find(c => c.id === Number(id));
  const relatedCars = cars.filter(c => c.id !== car?.id && c.brand === car?.brand).slice(0, 3);
  const isFav = favorites.includes(car?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, [id]);

  if (!car) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}>
        <p style={{ fontSize: '60px' }}>🏎</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '32px',
          color: '#f0ede8',
        }}>Vehicle Not Found</h2>
        <Link to="/" className="btn btn-gold">Back to Collection</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(car);
    setAddedPulse(true);
    setTimeout(() => setAddedPulse(false), 800);
  };

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', paddingTop: '72px' }}>

{/* Hero */}
<section style={{
  position: 'relative',
  height: 'clamp(400px, 55vh, 680px)',
  overflow: 'hidden',
}}>
    {car.heroVideo ? (
    <ReactPlayer
      url={car.heroVideo}
      playing={true}
      muted={true}
      loop={true}
      controls={false}
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    />
  ) : (
    <img
      src={car.heroImage || car.image}
      alt={car.name}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 40%',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'scale(1)' : 'scale(1.04)',
        transition: 'opacity 1s, transform 1.2s cubic-bezier(0.22,1,0.36,1)',
      }}
    />
  )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.5) 40%, rgba(5,5,7,0.15) 100%),
            linear-gradient(to right, rgba(5,5,7,0.8) 0%, transparent 40%)
          `,
        }} />

        {/* Back button */}
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '32px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(5,5,7,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: 'rgba(240,237,232,0.7)',
              padding: '9px 16px',
              cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
              e.currentTarget.style.color = '#c9a84c';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(240,237,232,0.7)';
            }}
          >
            ← Back
          </button>
        </div>

        {/* Title overlay */}
        <div className="container" style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 2,
        }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#c9a84c',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ width: '24px', height: '1px', background: '#c9a84c', display: 'inline-block' }} />
              {car.brand} · {car.year} · {car.category}
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: '400',
              color: '#f0ede8',
              lineHeight: '1',
              letterSpacing: '-0.5px',
            }}>{car.name}</h1>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '48px',
            paddingTop: '48px',
            alignItems: 'start',
          }}>
            {/* Left column */}
            <div>
              {/* Tagline */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                fontWeight: '300',
                fontStyle: 'italic',
                color: 'rgba(240,237,232,0.6)',
                lineHeight: '1.5',
                marginBottom: '40px',
                paddingBottom: '40px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>"{car.tagline}"</p>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                gap: '0',
                marginBottom: '40px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                {[
                  { key: 'specs', label: 'Specifications' },
                  { key: 'features', label: 'Features' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      padding: '14px 28px',
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === key
                        ? '2px solid #c9a84c'
                        : '2px solid transparent',
                      color: activeTab === key ? '#c9a84c' : 'rgba(240,237,232,0.4)',
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '12px',
                      fontWeight: '600',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      marginBottom: '-1px',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'specs' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  animation: 'fadeUp 0.4s both',
                }}>
                  {Object.entries(car.specs).map(([key, value]) => (
                    <SpecCard key={key} label={key} value={value} />
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  animation: 'fadeUp 0.4s both',
                }}>
                  {car.features.map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '18px 24px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.25s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                        e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c9a84c, #e0c06a)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(240,237,232,0.8)',
                      }}>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Related cars */}
              {relatedCars.length > 0 && (
                <div style={{ marginTop: '60px' }}>
                  <p className="section-eyebrow" style={{ marginBottom: '24px' }}>
                    More from {car.brand}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px',
                  }}>
                    {relatedCars.map(rc => (
                      <RelatedCard key={rc.id} car={rc} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column — Purchase card */}
            <div style={{ position: 'sticky', top: '96px' }}>
              <div style={{
                background: 'rgba(16,16,22,0.9)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                animation: 'fadeUp 0.6s 0.2s both',
              }}>
                {/* Price */}
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,232,0.4)',
                  marginBottom: '6px',
                }}>Starting Price</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '42px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #c9a84c, #e0c06a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>{fmt(car.price)}</p>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(240,237,232,0.3)',
                  marginBottom: '28px',
                }}>Excluding taxes, registration & delivery</p>

                {/* Color */}
                <div style={{
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c9a84c, #f0ede8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'rgba(240,237,232,0.3)',
                      marginBottom: '2px',
                    }}>Color</p>
                    <p style={{ fontSize: '13px', color: '#f0ede8', fontWeight: '400' }}>{car.color}</p>
                  </div>
                </div>

                {/* Availability */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '28px',
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: car.inStock ? '#4ade80' : '#e03030',
                    boxShadow: car.inStock
                      ? '0 0 0 4px rgba(74,222,128,0.15)'
                      : '0 0 0 4px rgba(224,48,48,0.15)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    color: car.inStock ? 'rgba(240,237,232,0.7)' : 'rgba(240,237,232,0.5)',
                  }}>
                    {car.inStock ? 'In Stock — Ready for Delivery' : 'Pre-Order — 8–12 Months'}
                  </span>
                </div>

                {/* CTAs */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: addedPulse
                      ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                      : 'linear-gradient(135deg, #c9a84c, #e0c06a)',
                    border: 'none',
                    borderRadius: '10px',
                    color: addedPulse ? '#fff' : '#050507',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    transform: addedPulse ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  {addedPulse ? '✓ Added to Garage' : '+ Add to Garage'}
                </button>

                <button
                  onClick={() => toggleFavorite(car)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'transparent',
                    border: isFav
                      ? '1px solid rgba(201,168,76,0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: isFav ? '#c9a84c' : 'rgba(240,237,232,0.5)',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginBottom: '24px',
                    transition: 'all 0.25s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={e => {
                    if (!isFav) {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                      e.currentTarget.style.color = 'rgba(201,168,76,0.7)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isFav) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(240,237,232,0.5)';
                    }
                  }}
                >
                  <span>{isFav ? '♥' : '♡'}</span>
                  {isFav ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>

                {/* Info bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { icon: '🚚', text: 'Free white-glove delivery' },
                    { icon: '🛡', text: '4-year manufacturer warranty' },
                    { icon: '🔑', text: 'Complimentary test drive' },
                    { icon: '↩', text: '14-day return policy' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px' }}>{icon}</span>
                      <span style={{ fontSize: '12px', color: 'rgba(240,237,232,0.45)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Spec Card ── */
function SpecCard({ label, value }) {
  const labelMap = {
    engine: 'Engine',
    horsepower: 'Power',
    torque: 'Torque',
    topSpeed: 'Top Speed',
    acceleration: 'Acceleration',
    transmission: 'Transmission',
    drivetrain: 'Drivetrain',
    range: 'Range',
  };

  return (
    <div
      style={{
        padding: '20px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
        e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '9px',
        fontWeight: '600',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: 'rgba(240,237,232,0.3)',
        marginBottom: '8px',
      }}>{labelMap[label] || label}</p>
      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '15px',
        fontWeight: '600',
        color: value === 'N/A' ? 'rgba(240,237,232,0.25)' : '#f0ede8',
        lineHeight: 1.3,
      }}>{value}</p>
    </div>
  );
}

/* ── Related Card ── */
function RelatedCard({ car }) {
  return (
    <Link
      to={`/car/${car.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(18,18,24,0.8)',
          transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ height: '130px', overflow: 'hidden' }}>
          <img
            src={car.image}
            alt={car.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div style={{ padding: '14px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            fontWeight: '600',
            color: '#f0ede8',
            marginBottom: '4px',
          }}>{car.name}</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px',
            background: 'linear-gradient(135deg, #c9a84c, #e0c06a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(car.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}