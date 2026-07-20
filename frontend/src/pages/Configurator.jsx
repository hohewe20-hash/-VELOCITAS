import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useApp } from '../context/AppContext';

const COLORS = [
  { name: 'Midnight Black', hex: '#0a0a0a' },
  { name: 'Arctic White', hex: '#f5f5f5' },
  { name: 'Racing Red', hex: '#c0392b' },
  { name: 'Ocean Blue', hex: '#1a3a5c' },
  { name: 'Forest Green', hex: '#1e4d2b' },
  { name: 'Titanium Grey', hex: '#6b7280' },
];

const WHEELS = [
  { name: 'Standard 19"', price: 0, img: '🔘' },
  { name: 'Sport 21"', price: 3500, img: '⚙️' },
  { name: 'Forged 22"', price: 7200, img: '🏎️' },
];

const PACKAGES = [
  { name: 'Sport Chrono', price: 4100, desc: 'Launch Control + Track Modes' },
  { name: 'Premium Sound', price: 6800, desc: 'Burmester® 3D Surround' },
  { name: 'Night Vision', price: 3200, desc: 'Thermal Imaging Assist' },
  { name: 'Panoramic Roof', price: 2900, desc: 'Full Glass Roof Panel' },
];

export default function Configurator() {
  const navigate = useNavigate();
  const { addToCart, addToast } = useApp();

  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEELS[0]);
  const [selectedPackages, setSelectedPackages] = useState([]);

  const togglePackage = (pkg) => {
    setSelectedPackages(prev =>
      prev.find(p => p.name === pkg.name)
        ? prev.filter(p => p.name !== pkg.name)
        : [...prev, pkg]
    );
  };

  const totalPrice =
    selectedCar.price +
    selectedWheel.price +
    selectedPackages.reduce((s, p) => s + p.price, 0);

  const handleAddToCart = () => {
    addToCart({
      ...selectedCar,
      price: totalPrice,
      color: selectedColor.name,
      wheel: selectedWheel.name,
      packages: selectedPackages.map(p => p.name),
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '2rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '0.1em' }}>
          CONFIGURATOR
        </h1>
        <p style={{ color: '#888', marginTop: '0.5rem' }}>Build your perfect machine</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        
        {/* LEFT - Preview */}
        <div>
          {/* Car Image */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#111',
            border: '1px solid #222',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <img
              src={selectedCar.heroImage}
              alt={selectedCar.name}
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '2rem 1.5rem 1.5rem'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedCar.brand} {selectedCar.name}</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>{selectedCar.year} · {selectedCar.category}</div>
            </div>
          </div>

          {/* Select Car */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              SELECT MODEL
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {cars.slice(0, 6).map(car => (
                <div
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: `1px solid ${selectedCar.id === car.id ? '#e63946' : '#222'}`,
                    background: selectedCar.id === car.id ? '#1a0505' : '#111',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={car.image} alt={car.name} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', marginTop: '0.5rem', color: selectedCar.id === car.id ? '#e63946' : '#fff' }}>
                    {car.name}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#666' }}>{car.brand}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              EXTERIOR COLOR — <span style={{ color: '#fff' }}>{selectedColor.name}</span>
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {COLORS.map(color => (
                <div
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    background: color.hex,
                    cursor: 'pointer',
                    border: selectedColor.name === color.name ? '3px solid #e63946' : '3px solid #333',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              WHEEL PACKAGE
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {WHEELS.map(wheel => (
                <div
                  key={wheel.name}
                  onClick={() => setSelectedWheel(wheel)}
                  style={{
                    flex: 1, padding: '1rem',
                    borderRadius: '10px',
                    border: `1px solid ${selectedWheel.name === wheel.name ? '#e63946' : '#222'}`,
                    background: selectedWheel.name === wheel.name ? '#1a0505' : '#111',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{wheel.img}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', marginTop: '0.5rem' }}>{wheel.name}</div>
                  <div style={{ fontSize: '0.75rem', color: wheel.price === 0 ? '#666' : '#e63946' }}>
                    {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div>
            <h3 style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              OPTIONAL PACKAGES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {PACKAGES.map(pkg => {
                const active = selectedPackages.find(p => p.name === pkg.name);
                return (
                  <div
                    key={pkg.name}
                    onClick={() => togglePackage(pkg)}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: `1px solid ${active ? '#e63946' : '#222'}`,
                      background: active ? '#1a0505' : '#111',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{pkg.name}</span>
                      <span style={{ color: '#e63946', fontSize: '0.75rem' }}>+${pkg.price.toLocaleString()}</span>
                    </div>
                    <div style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.3rem' }}>{pkg.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div style={{ position: 'sticky', top: '2rem', alignSelf: 'start' }}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '16px',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#888' }}>
              YOUR CONFIGURATION
            </h3>

            {/* Summary Lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <SummaryLine label="Base Price" value={`$${selectedCar.price.toLocaleString()}`} />
              <SummaryLine label="Color" value={selectedColor.name} />
              <SummaryLine label="Wheels" value={selectedWheel.name}
                extra={selectedWheel.price > 0 ? `+$${selectedWheel.price.toLocaleString()}` : null} />
              {selectedPackages.map(pkg => (
                <SummaryLine key={pkg.name} label={pkg.name} value={`+$${pkg.price.toLocaleString()}`} highlight />
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #222', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>Total Price</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#e63946' }}>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#e63946',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                marginBottom: '0.75rem'
              }}
            >
              ADD TO GARAGE
            </button>
            <button
              onClick={() => navigate(-1)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'transparent',
                color: '#888',
                border: '1px solid #333',
                borderRadius: '10px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              BACK
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function SummaryLine({ label, value, extra, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
      <span style={{ color: '#666' }}>{label}</span>
      <span style={{ color: highlight ? '#e63946' : '#fff' }}>{extra || value}</span>
    </div>
  );
}