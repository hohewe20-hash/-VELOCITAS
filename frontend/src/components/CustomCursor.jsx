import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Check touch device
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);

      const tag = e.target.tagName?.toLowerCase();
      const isHoverable = e.target.closest('a, button, [data-hover], input, select, textarea, label, .car-card');
      setHovered(!!isHoverable);
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // RAF smooth follow for outer ring
    const animate = () => {
      const dx = pos.current.x - outerPos.current.x;
      const dy = pos.current.y - outerPos.current.y;
      outerPos.current.x += dx * 0.12;
      outerPos.current.y += dy * 0.12;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const outerSize = hovered ? 48 : clicked ? 28 : 40;
  const innerSize = hovered ? 6 : clicked ? 2 : 8;

  const base = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99999,
    borderRadius: '50%',
    transition: 'opacity 0.3s, width 0.2s, height 0.2s',
    opacity: hidden ? 0 : 1,
    top: 0, left: 0,
    willChange: 'transform',
  };

  return (
    <>
      {/* Outer ring */}
      <div ref={outerRef} style={{
        ...base,
        width: outerSize,
        height: outerSize,
        border: hovered
          ? '1.5px solid rgba(201,168,76,0.8)'
          : '1.5px solid rgba(201,168,76,0.5)',
        background: hovered ? 'rgba(201,168,76,0.06)' : 'transparent',
        mixBlendMode: 'normal',
      }}/>
      {/* Inner dot */}
      <div ref={innerRef} style={{
        ...base,
        width: innerSize,
        height: innerSize,
        background: 'var(--gold)',
        boxShadow: '0 0 8px rgba(201,168,76,0.6)',
      }}/>
    </>
  );
}