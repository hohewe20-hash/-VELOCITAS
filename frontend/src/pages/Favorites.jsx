import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useApp } from '../context/AppContext';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart, isInCart } = useApp();

  const favoriteCars = cars.filter(car => favorites.includes(car.id));

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '0.1em' }}>
          FAVORITES
        </h1>
        <p style={{ color: '#888', marginTop: '0.5rem' }}>
          {favoriteCars.length} {favoriteCars.length === 1 ? 'vehicle' : 'vehicles'} saved
        </p>
      </div>

      {/* Empty State */}
      {favoriteCars.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>♡</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            No favorites yet
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Browse our collection and save the cars you love
          </p>
          <button
            onClick={() => navigate('/cars')}
            style={{
              padding: '0.9rem 2.5rem',
              background: '#e63946',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              cursor: 'pointer'
            }}
          >
            EXPLORE CARS
          </button>
        </div>
      ) : (
        <>
          {/* Cars Grid */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {favoriteCars.map(car => (
              <div
                key={car.id}
                style={{
                  background: '#111',
                  border: '1px solid #222',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    onClick={() => navigate(`/cars/${car.id}`)}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                  />
                  {/* Remove Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(car)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid #e63946',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      color: '#e63946',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ♥
                  </button>
                  {/* Stock Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: car.inStock ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                    border: `1px solid ${car.inStock ? '#22c55e' : '#ef4444'}`,
                    borderRadius: '6px',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    color: car.inStock ? '#22c55e' : '#ef4444'
                  }}>
                    {car.inStock ? 'IN STOCK' : 'SOLD OUT'}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{car.name}</div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>{car.brand} · {car.year}</div>
                    </div>
                    <div style={{ color: '#e63946', fontWeight: '800', fontSize: '1.1rem' }}>
                      ${car.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    margin: '1rem 0',
                    padding: '0.75rem',
                    background: '#0a0a0a',
                    borderRadius: '8px'
                  }}>
                    <SpecItem label="HP" value={car.specs.horsepower} />
                    <SpecItem label="0-60" value={car.specs.acceleration} />
                    <SpecItem label="Top Speed" value={car.specs.topSpeed} />
                    <SpecItem label="Drive" value={car.specs.drivetrain} />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => navigate(`/cars/${car.id}`)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'transparent',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        letterSpacing: '0.05em'
                      }}
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => car.inStock && addToCart(car)}
                      disabled={!car.inStock || isInCart(car.id)}
                      style={{
                        flex: 2,
                        padding: '0.75rem',
                        background: !car.inStock || isInCart(car.id) ? '#1a1a1a' : '#e63946',
                        color: !car.inStock || isInCart(car.id) ? '#555' : '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: !car.inStock || isInCart(car.id) ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {isInCart(car.id) ? 'IN GARAGE ✓' : !car.inStock ? 'SOLD OUT' : 'ADD TO GARAGE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear All */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => favoriteCars.forEach(car => toggleFavorite(car))}
              style={{
                padding: '0.75rem 2rem',
                background: 'transparent',
                color: '#666',
                border: '1px solid #333',
                borderRadius: '10px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              CLEAR ALL FAVORITES
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div>
      <div style={{ color: '#555', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{label}</div>
      <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>{value}</div>
    </div>
  );
}