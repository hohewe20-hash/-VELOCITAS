export default function Hero() {
  return (
    <section style={styles.hero}>

      {/* Background Image (stable & guaranteed) */}
      <div style={styles.bg}></div>

      {/* Overlay احترافي مش سودة سادة */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>DRIVE THE FUTURE</h1>
        <p style={styles.subtitle}>
          Performance • Precision • Luxury
        </p>

        <button style={styles.button}>
          Explore Collection
        </button>
      </div>

    </section>
  );
}

/* ================= STYLES ================= */

const styles = {
  hero: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1619767886558-efdc259cde1a')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.05)",
    zIndex: 0,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "white",
  },

  title: {
    fontSize: "52px",
    letterSpacing: "4px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    opacity: 0.7,
    marginBottom: "20px",
    fontSize: "16px",
  },

  button: {
    padding: "12px 22px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "0.3s",
  },
};