import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useApp } from '../context/AppContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useParallax from '../hooks/useParallax';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const HERO_SLIDES = [
  { carId: 1, headline: 'Drive the', accent: 'Extraordinary', sub: 'Where engineering becomes art.' },
  { carId: 7, headline: 'Electric', accent: 'Revolution', sub: 'The future arrives at 1,020 horsepower.' },
  { carId: 3, headline: 'Born on the', accent: 'Circuit', sub: 'Barely legal. Absolutely breathtaking.' },
  { carId: 12, headline: 'Beyond all', accent: 'Limits', sub: '1.9 seconds to 60. Nothing else matters.' },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const parallax = useParallax(0.35);
  const carsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[slide];
  const heroCar = cars.find(c => c.id === current.carId);

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>

        {/* Background image with Ken Burns */}
        {HERO_SLIDES.map((s, i) => {
          const car = cars.find(c => c.id === s.carId);
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)',
            }}>
              <img
                src={car?.heroImage || car?.image}
                alt=""
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  objectPosition: 'center 35%',
                  transform: `translateY(${parallax}px)`,
                  animation: i === slide ? 'kenBurns 12s ease-in-out both' : 'none',
                  willChange: 'transform',
                }}
              />
            </div>
          );
        })}

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,7,0.92) 30%, rgba(5,5,7,0.45) 65%, rgba(5,5,7,0.2) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.3) 35%, transparent 65%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)' }}/>

        {/* Grid decoration */}
        <GridLines />

        {/* Slide indicators */}
        <div style={{
          position: 'absolute', top: '50%', right: 40,
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{
              width: i === slide ? 2 : 1,
              height: i === slide ? 40 : 20,
              background: i === slide
                ? 'linear-gradient(to bottom, var(--gold), var(--gold-light))'
                : 'rgba(255,255,255,0.2)',
              border: 'none', borderRadius: 2, cursor: 'none',
              transition: 'all 0.4s var(--ease-out)',
            }}/>
          ))}
        </div>

        {/* Content */}
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 5, paddingTop: 'var(--nav-h)' }}>
          <div style={{ maxWidth: 680 }}>

            <div key={slide} style={{ animation: 'fadeInLeft 0.7s var(--ease-out) both' }}>
              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
                letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }}/>
                VELOCITAS MOTORS · EST. 2024
              </p>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 7vw, 100px)',
                fontWeight: 300,
                lineHeight: 1.02,
                color: 'var(--white)',
                marginBottom: 20,
                letterSpacing: '-1px',
              }}>
                {current.headline}<br/>
                <em style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{current.accent}</em>
              </h1>

              <p style={{
                fontSize: 17, fontWeight: 300,
                color: 'rgba(240,237,232,0.6)',
                lineHeight: 1.7, marginBottom: 44, maxWidth: 440,
              }}>{current.sub}</p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-gold"
                  onClick={() => navigate(`/car/${heroCar?.id}`)}
                  data-hover
                >View Vehicle</button>
                <button
                  className="btn btn-ghost"
                  onClick={() => carsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  data-hover
                >Explore Collection</button>
              </div>
            </div>

            {/* Live stats */}
            <div style={{
              position: 'absolute', bottom: 48, left: 48,
              display: 'flex', gap: 40,
              opacity: loaded ? 1 : 0, transition: 'opacity 1s 1s',
            }}>
              {[
                { v: heroCar?.specs.horsepowerStr || '–', l: 'Power' },
                { v: heroCar?.specs.accelStr || '–', l: '0–60 mph' },
                { v: heroCar?.specs.topSpeedStr || '–', l: 'Top Speed' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div key={`${slide}-${l}`} style={{
                    fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600,
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1,
                    animation: 'fadeUp 0.5s var(--ease-out) both',
                  }}>{v}</div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '2.5px',
                    textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginTop: 6,
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: 0.45, animation: 'float 3s ease-in-out infinite',
          cursor: 'none', zIndex: 10,
        }} onClick={() => carsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white-40)' }}>SCROLL</span>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, var(--gold-light), transparent)' }}/>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <StatsBar />

      {/* ══ FEATURED SECTION ══ */}
      <FeaturedSection />

      {/* ══ BRANDS SECTION ══ */}
      <BrandsSection />

      {/* ══ COLLECTION PREVIEW ══ */}
      <div ref={carsRef} id="collection">
        <CollectionPreview />
      </div>

      {/* ══ CTA BANNER ══ */}
      <CTABanner />

      {/* ══ FOOTER ══ */}
      <Footer />
    </div>
  );
}

/* ── Stats Bar ── */
function StatsBar() {
  return (
    <div style={{
      background: 'rgba(11,11,15,0.95)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '26px 48px', flexWrap: 'wrap', gap: 24,
      }}>
        {[
          { icon: '⚡', label: 'Instant Delivery', desc: 'Nationwide white-glove' },
          { icon: '🛡', label: 'Full Warranty',    desc: '4-year factory coverage' },
          { icon: '💎', label: 'Concierge',         desc: 'Personal automotive advisor' },
          { icon: '🔑', label: 'Test Drive',        desc: 'At your doorstep' },
        ].map(({ icon, label, desc }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--white)', letterSpacing: '0.3px' }}>{label}</p>
              <p style={{ fontSize: 12, color: 'var(--white-40)' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Featured Section ── */
function FeaturedSection() {
  const featured = cars.filter(c => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,].includes(c.id));
  const [ref, visible] = useIntersectionObserver();

  return (
    <section style={{ padding: '110px 0 80px' }} ref={ref}>
      <div className="container">
        <div style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Editor's Selection</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.1 }}>
              Most Coveted<br/>
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Machines</em>
            </h2>
          </div>
          <Link to="/cars" className="btn btn-ghost" data-hover>View All Collection →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {featured.map((car, i) => (
            <FeaturedCard key={car.id} car={car} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ car, index, visible }) {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const [hov, setHov] = useState(false);

  return (
    <div
      className="car-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: hov ? 'rgba(25,25,33,0.98)' : 'rgba(17,17,23,0.9)',
        border: hov ? '1px solid rgba(201,168,76,0.3)' : '1px solid var(--border)',
        transition: 'all 0.5s var(--ease-out)',
        transform: hov ? 'translateY(-10px) perspective(1000px) rotateX(1deg)' : 'translateY(0)',
        boxShadow: hov ? '0 28px 70px rgba(0,0,0,0.65), var(--shadow-gold)' : 'var(--shadow-sm)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        animation: visible ? `fadeUp 0.7s ${index * 0.12}s var(--ease-out) both` : 'none',
        cursor: 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <img src={car.image} alt={car.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.7s var(--ease-out)',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
        }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,23,0.9) 0%, rgba(17,17,23,0.1) 55%)' }}/>

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 16, left: 16,
          padding: '4px 12px', borderRadius: 4,
          fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)',
          color: 'var(--gold)',
        }}>{car.category}</span>

        {!car.inStock && (
          <span style={{
            position: 'absolute', top: 16, left: car.category ? 110 : 16,
            padding: '4px 10px', borderRadius: 4,
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
            letterSpacing: '1px', textTransform: 'uppercase',
            background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.4)',
            color: 'var(--red)',
          }}>Pre-Order</span>
        )}

        {/* Fav btn */}
        <button onClick={(e) => { e.preventDefault(); toggleFavorite(car); }} style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: isFavorite(car.id) ? 'rgba(201,168,76,0.25)' : 'rgba(5,5,7,0.65)',
          border: isFavorite(car.id) ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.1)',
          color: isFavorite(car.id) ? 'var(--gold)' : 'var(--white-40)',
          fontSize: 14, cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', transition: 'all 0.25s',
        }}>
          {isFavorite(car.id) ? '♥' : '♡'}
        </button>

        {/* Stars overlay */}
        <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 11, color: 'var(--gold)' }}>{'★'.repeat(Math.round(car.rating))}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--white-40)' }}>({car.reviewCount})</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 24px 24px' }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{car.brand} · {car.year}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--white)', marginBottom: 8, lineHeight: 1.1 }}>{car.name}</h3>
        <p style={{ fontSize: 12, color: 'var(--white-40)', fontStyle: 'italic', marginBottom: 18 }}>{car.tagline}</p>

        {/* Mini specs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {[
            { l: 'Power', v: car.specs.horsepowerStr },
            { l: '0–60', v: car.specs.accelStr },
          ].map(({ l, v }) => (
            <div key={l} style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--white-20)', marginBottom: 3 }}>{l}</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--white)' }}>{v}</p>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--white-20)', marginBottom: 2 }}>From</p>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{fmt(car.price)}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/car/${car.id}`} className="btn btn-ghost" data-hover style={{ padding: '9px 14px', fontSize: 11 }}>Details</Link>
            <button onClick={() => addToCart(car)} className="btn btn-gold" data-hover style={{ padding: '9px 14px', fontSize: 11 }}>+ Garage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Brands Section ── */
function BrandsSection() {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section ref={ref} style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: 48 }}>Our Partners</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap' }}>
          {[
            { name: 'Porsche', count: 8 },
            { name: 'Tesla', count: 5 },
            { name: 'Bmw', count: 3 },
            { name: 'Mercedes', count: 6 },
            { name: 'Ferrari', count: 7 },
            { name: 'Lamborghini', count: 4 },
          ].map(({ name, count }, i) => (
            <div key={name} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: `all 0.7s ${i * 0.15}s var(--ease-out)`,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 300,
                color: 'var(--white)', letterSpacing: '4px', lineHeight: 1,
                marginBottom: 8, opacity: 0.85,
              }}>{name}</div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '3px', color: 'var(--gold)' }}>{count} MODELS</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Collection Preview ── */
function CollectionPreview() {
  const preview = cars.slice(0, 12);
  const [ref, visible] = useIntersectionObserver();

  return (
    <section style={{ padding: '80px 0 100px', background: 'rgba(8,8,12,0.6)' }} ref={ref}>
      <div className="container">
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Full Collection</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.1 }}>
              12 Exceptional<br/>
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Machines</em>
            </h2>
          </div>
          <Link to="/cars" className="btn btn-outline-gold" data-hover>Browse All →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {preview.map((car, i) => (
            <MiniCard key={car.id} car={car} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniCard({ car, index, visible }) {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const [hov, setHov] = useState(false);

  return (
    <Link to={`/car/${car.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="car-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: hov ? '1px solid rgba(201,168,76,0.25)' : '1px solid var(--border)',
          background: hov ? 'var(--surface-2)' : 'var(--surface)',
          transition: 'all 0.4s var(--ease-out)',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hov ? 'var(--shadow-md), var(--shadow-gold)' : 'none',
          opacity: visible ? 1 : 0,
          animation: visible ? `fadeUp 0.6s ${index * 0.08}s var(--ease-out) both` : 'none',
          cursor: 'none',
          display: 'flex',
        }}
      >
        <div style={{ width: 130, flexShrink: 0, overflow: 'hidden' }}>
          <img src={car.image} alt={car.name} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s var(--ease-out)',
            transform: hov ? 'scale(1.08)' : 'scale(1)',
          }}/>
        </div>
        <div style={{ flex: 1, padding: '16px 18px', minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{car.brand}</p>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--white)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.name}</h4>
          <p style={{ fontSize: 11, color: 'var(--white-40)', marginBottom: 12 }}>{car.specs.horsepowerStr} · {car.specs.accelStr}</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{fmt(car.price)}</p>
        </div>
      </div>
    </Link>
  );
}

/* ── CTA Banner ── */
function CTABanner() {
  const [ref, visible] = useIntersectionObserver();
  return (
    <section ref={ref} style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{
          background: 'rgba(17,17,23,0.8)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(48px, 6vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s var(--ease-out)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Experience the Difference</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--white)', marginBottom: 20, lineHeight: 1.1 }}>
            Ready to Find Your<br/>
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Perfect Machine?</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--white-40)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            Let our AI concierge guide you, or explore the full collection at your own pace.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cars" className="btn btn-gold" data-hover>Browse Collection</Link>
            <Link to="/compare" className="btn btn-ghost" data-hover>Compare Models</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '52px 0 36px', background: 'rgba(5,5,7,0.98)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>
              VELOCI<span style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TAS</span>
            </p>
            <p style={{ fontSize: 13, color: 'var(--white-40)', maxWidth: 280 }}>The world's most exclusive automotive experience.</p>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Collection', 'Compare', 'Favorites', 'Configurator'].map(l => (
              <Link key={l} to={`/${l.toLowerCase()}`} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--white-40)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--white-40)'}
              >{l}</Link>
            ))}
          </div>
        </div>
        <div className="divider" style={{ marginBottom: 24 }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--white-20)' }}>© 2024 Velocitas Motors. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '2.5px', color: 'var(--white-20)' }}>LUXURY · PERFORMANCE · EXCELLENCE</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Grid lines decoration ── */
function GridLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
      {[...Array(22)].map((_, i) => (
        <line key={`v${i}`} x1={`${i * 4.76}%`} y1="0" x2={`${i * 4.76}%`} y2="100%" stroke="#C9A84C" strokeWidth="0.5"/>
      ))}
      {[...Array(12)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={`${i * 9.1}%`} x2="100%" y2={`${i * 9.1}%`} stroke="#C9A84C" strokeWidth="0.5"/>
      ))}
    </svg>
  );
}