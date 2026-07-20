import { useEffect } from "react";

export default function Loading({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.logo}>PORSCHE</h1>
      <p style={styles.text}>Loading Experience...</p>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    zIndex: 9999,
  },
  logo: {
    fontSize: "50px",
    letterSpacing: "5px",
  },
  text: {
    opacity: 0.6,
    marginTop: "10px",
  },
};