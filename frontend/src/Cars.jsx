import React from "react";
import { Link } from "react-router-dom";

const cars = [
  { id: 1, name: "Porsche 911 Turbo S", price: "$216,450" },
  { id: 2, name: "Model S Plaid", price: "$89,990" },
  { id: 3, name: "Taycan Turbo S", price: "$87,400" },
   { id: 4, name: "Model X Plaid", price: "$104,990" },
   { id: 5, name: "Cayenne Turbo GT", price: "$183,250" },
   { id: 6, name: "Roadster 2.0", price: "$250,000" },
   { id: 7, name: "718 Cayman GT4", price: "$102,150" },
   { id: 8, name: "Model 3 Performance", price: "$50,990" },
   { id: 9, name: " Panamera Turbo S ", price: "$198,050" },
   { id: 10, name: "Cybertruck All-Wheel Drive ", price: "$79,990" },
   { id: 11, name: "911 GT3 RS ", price: "$243,600" },
   { id: 12, name: "911 GT2 RS ", price: "$293,200" },
{ id: 13, name: "911 Carrera 4S ", price: "$133,450" },
{ id: 14, name: "Macan EV Turbo ", price: "$99,900" },
{ id: 15, name: "SF90 Stradale ", price: "$507,000" },
{ id: 16, name: "296 GTB ", price: "$322,986" },
{ id: 17, name: "Huracán STO ", price: "$328,922" },
{ id: 18, name: "Urus S ", price: "$238,450" },
{ id: 19, name: "720S Spider ", price: "$315,000" },
{ id: 20, name: "Chiron Super Sport ", price: "$3,900,000" },
{ id: 21, name: "AMG GT 63 S E Performance ", price: "$189,050" },
{ id: 22, name: "M8 Competition ", price: "$133,900" },
{ id: 23, name: "R8 V10 Performance ", price: "$208,100" },
{ id: 24, name: "Corvette Z06 ", price: "$109,295" },
{ id: 25, name: "GT Heritage Edition ", price: "$496,770" },
{ id: 26, name: "Nevera ", price: "$2,400,000" },
{ id: 27, name: "Air Sapphire ", price: "$249,000" },
{ id: 28, name: "R1T Adventure ", price: "$74,900" },
{ id: 29, name: "DB12 ", price: "$245,000" },
{ id: 30, name: "Continental GT Speed ", price: "$274,900" },
{ id: 31, name: "Model Y Performance ", price: "$52,990" },
{ id: 32, name: "Vantage Roadster ", price: "$189,000" },
{ id: 33, name: "488 Pista Spider ", price: "$608,358" },
{ id: 34, name: "Revuelto ", price: "$608,358" },
{ id: 35, name: "Artura Spider ", price: "$274,500" },

];

export default function Cars() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Car Collection</h1>

      <div style={styles.grid}>
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} style={styles.card}>
            <h2>{car.name}</h2>
            <p>{car.price}</p>
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
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 20,
  },
  card: {
    padding: 20,
    background: "#111",
    borderRadius: 12,
    textDecoration: "none",
    color: "#fff",
  },
};