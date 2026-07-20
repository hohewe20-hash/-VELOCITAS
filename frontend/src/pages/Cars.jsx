import React from "react";
import { Link } from "react-router-dom";
import { cars } from "../data/cars";

export default function Cars() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Car Collection</h1>

      <div style={styles.grid}>
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img
                src={car.image}
                alt={car.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x200/1a1a1a/666666?text=No+Image";
                }}
              />
            </div>
            <h2 style={styles.carName}>{car.name}</h2>
            <p style={styles.price}>${car.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 40, background: "#0a0a0a", color: "#fff", minHeight: "100vh" },
  title: { textAlign: "center", marginBottom: 30 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 20,
    background: "#111",
    borderRadius: 12,
    textDecoration: "none",
    color: "#fff",
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    background: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  carName: {
    margin: "0 0 6px 0",
    fontSize: 16,
  },
  price: {
    margin: 0,
    color: "#c9a84c",
    fontSize: 14,
  },
};