import { useState } from "react";

// ─── Sample data shape — replace with your actual cars data import ───
// import { cars } from "../data/cars";
const cars = [
  {
    id: 1,
    make: "BMW",
    model: "M3 Competition",
    year: 2021,
    price: 75000,
    image: "https://www.topgear.com/sites/default/files/2021/10/ROW02344.jpg?w=892&h=502",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: 503,
      torque: "479 lb-ft",
      transmission: "8-Speed Auto",
      drivetrain: "RWD / xDrive",
      acceleration: "3.8s 0-60",
      topSpeed: "180 mph",
      fuelEconomy: "16/23 mpg",
      seating: 5,
      cargo: "13.0 cu ft",
    },
    color: "#1a1a2e",
  },
  {
    id: 2,
    make: "Mercedes",
    model: "C63 AMG",
    year: 2025,
    price: 80000,
    image: "https://tse1.mm.bing.net/th/id/OIP.5XYbfhb6upc0Ie_Tx9Gq6gHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "2.0L Turbo I4 Hybrid",
      horsepower: 671,
      torque: "752 lb-ft",
      transmission: "9-Speed Auto",
      drivetrain: "AWD",
      acceleration: "3.4s 0-60",
      topSpeed: "174 mph",
      fuelEconomy: "22/28 mpg",
      seating: 5,
      cargo: "12.6 cu ft",
    },
    color: "#1b2838",
  },
  {
    id: 3,
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 78000,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&q=80",
    specs: {
      engine: "hybrid",
      horsepower: 600,
      torque: "443 lb-ft",
      transmission: "8-Speed Tiptronic",
      drivetrain: "Quattro AWD",
      acceleration: "3.9s 0-60",
      topSpeed: "174 mph",
      fuelEconomy: "19/28 mpg",
      seating: 5,
      cargo: "13.7 cu ft",
    },
    color: "#1a2a1a",
  },
  {
    id: 4,
    make: "Porsche",
    model: "911 Carrera S",
    year: 2025,
    price: 130000,
    image: "https://th.bing.com/th/id/R.bd40fcc971f5e832b063603ae21309c2?rik=9%2fCsdSi1wPyx9w&riu=http%3a%2f%2fs1.paultan.org%2fimage%2f2015%2f09%2f2016-991-gen-porsche-911-carrera-carrera-s-facelift-12-e1441589472783.jpg&ehk=Fky92RwV1U3%2fFpxLmubNrNPkvHj1YQWi%2bIAF6ObmPtQ%3d&risl=&pid=ImgRaw&r=0",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
  {
    id: 5,
    make: "Porsche",
    model: "Porsche 911 Turbo S",
    year: 2022,
    price: 330000,
    image: "https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/17q4/692997/2018-porsche-911-turbo-s-exclusive-first-drive-review-car-and-driver-photo-695623-s-original.jpg?crop=1xw:1xh;center,center&resize=900:*",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 583,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.9s 0-60",
      topSpeed: "199 mph",
      fuelEconomy: "16/22 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 6,
    make: "Porsche",
    model: "Taycan Turbo S",
    year: 2025,
    price: 660000,
    image: "https://ev-database.org/img/auto/Porsche_Taycan_Turbo_S/Porsche_Taycan_Turbo_S-01@2x.jpg",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 622,
      torque: "390 lb-ft",
      transmission: "9-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "211 mph",
      fuelEconomy: "17/28 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 7,
    make: "Tesla",
    model: "Model X Plaid",
    year: 2026,
    price: 60000,
    image: "https://media.evo.co.uk/image/private/s--aseH2gx3--/v1611850972/evo/2021/01/Tesla%20Model%20X%20Plaid%20revealed.jpg",
    specs: {
      engine: "hybrid",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "299 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 8,
    make: "Porsche",
    model: "Cayenne Turbo GT",
    year: 2025,
    price: 730000,
    image: "https://parkers-images.bauersecure.com/wp-images/47/driving-moving-exterior/400x300/72-porsche-cayenne-coupe-front-driving.jpg?mode=max&quality=90&scale=down",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 663,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "215 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 9,
    make: "tesla",
    model: "Roadster 2.0",
    year: 2026,
    price: 75000,
    image: "https://tse4.mm.bing.net/th/id/OIP.sPQtnppfhgiLRgubeeOaugHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "hybrid",
      horsepower: 900,
      torque: "399 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "17/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 10,
    make: "porsche",
    model: "718 Cayman GT4",
    year: 2024,
    price: 520000,
    image: "https://tse2.mm.bing.net/th/id/OIP.BklTd_BCoIYQvqO5mf2f2AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L Twin-Turbo Flat-6",
      horsepower: 720,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "211 mph",
      fuelEconomy: "28/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 11,
    make: "Tesla",
    model: "Model 3 Performance",
    year: 2026,
    price: 90000,
    image: "https://tse1.mm.bing.net/th/id/OIP.kgq0MzmnaLEBzI2keNR8vQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "hybrid",
      horsepower: 500,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.0s 0-60",
      topSpeed: "180 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 12,
    make: "porsche",
    model: "Panamera Turbo S",
    year: 2025,
    price: 24400,
    image: "https://tse3.mm.bing.net/th/id/OIP.RET90TESusHIiOt5QhiMKQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 640,
      torque: "560 lb-ft",
      transmission: "7-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.8s 0-60",
      topSpeed: "196 mph",
      fuelEconomy: "18/22 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 13,
    make: "tesla",
    model: "Cybertruck All-Wheel Drive",
    year: 2022,
    price: 60000,
    image: "https://assets-global.website-files.com/63bdd46abd3b7068c0d09a4e/63f176797d754159b6ad2398_0x0-Cybertruck_01-p-1600.jpg",
    specs: {
      engine: "hybrid",
      horsepower: 400,
      torque: "290 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "160 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 14,
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2026,
    price: 560000,
    image: "https://tse1.mm.bing.net/th/id/OIP.oPQmQx5d9_8vjw8OGfUXaQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=30",
    specs: {
      engine: "4.0L Twin-Turbo Flat-6",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "200 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 15,
    make: "Porsche",
    model: "911 GT2 RS",
    year: 2025,
    price: 330000,
    image: "https://tse1.mm.bing.net/th/id/OIP.4Q1MmjFhM3N0qMFQGq1d2gHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L Twin-Turbo Flat-5",
      horsepower: 709,
      torque: "390 lb-ft",
      transmission: "9-Speed PDK",
      drivetrain: "RWD",
      acceleration: "2.5s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "11/22 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 16,
    make: "Porsche",
    model: "911 Carrera 4S",
    year: 2026,
    price: 220000,
    image: "https://www.hdcarwallpapers.com/thumbs/2018/porsche_911_carrera_4s_2019_4k_11-t2.jpg",
    specs: {
      engine: "6.0L Twin-Turbo Flat-6",
      horsepower: 320,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.9s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 17,
    make: "Porsche",
    model: "Macan EV Turbo",
    year: 2024,
    price: 630000,
    image: "https://tse2.mm.bing.net/th/id/OIP.F0Islw2aF0lq2NN-ByvkCQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "5.0L Twin-Turbo Flat-6",
      horsepower: 500,
      torque: "390 lb-ft",
      transmission: "6-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "18/24 mpg",
      seating: 5,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 18,
    make: "Ferrari",
    model: "SF90 Stradale",
    year: 2025,
    price: 2100000,
    image: "https://tse1.mm.bing.net/th/id/OIP.hiUFkO0KbK9qzUnp4x8MbQHaEc?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "6.0L Twin-Turbo Flat-6",
      horsepower: 800,
      torque: "590 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "2.2s 0-60",
      topSpeed: "213 mph",
      fuelEconomy: "18/24 mpg",
      seating: 2,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 19,
    make: "Ferrari",
    model: "296 GTB",
    year: 2024,
    price: 3500000,
    image: "https://tse1.mm.bing.net/th/id/OIP.Cu4u7xwiBjv7owa6ScIZxQHaEb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "6.2L Twin-Turbo Flat-6",
      horsepower: 750,
      torque: "650 lb-ft",
      transmission: "12-Speed PDK",
      drivetrain: "RWD",
      acceleration: "2.0s 0-60",
      topSpeed: "250 mph",
      fuelEconomy: "18/24 mpg",
      seating: 2,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 20,
    make: "lamborghini",
    model: "Huracán STO",
    year: 2025,
    price: 6800000,
    image: "https://www.hdcarwallpapers.com/download/lamborghini_huracan_sto_2021_5k_43-3840x2160.jpg",
    specs: {
      engine: "3.0L Twin-Turbo Flat-5",
      horsepower: 860,
      torque: "700 lb-ft",
      transmission: "9-Speed PDK",
      drivetrain: "RWD",
      acceleration: "2.2s 0-60",
      topSpeed: "264 mph",
      fuelEconomy: "14/29 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 21,
    make: "lamborghini",
    model: "Urus S",
    year: 2024,
    price: 630000,
    image: "https://tse3.mm.bing.net/th/id/OIP.gZPY4TRqcoGOgppaH8BbtAHaEH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L Twin-Turbo ",
      horsepower: 620,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "211 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 22,
    make: "mclaren",
    model: "720S Spider",
    year: 2025,
    price: 650000,
    image: "https://tse2.mm.bing.net/th/id/OIP.efFIui5GExdJIw2MvCs87AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "3.0L Twin-Turbo Flat-2",
      horsepower: 580,
      torque: "490 lb-ft",
      transmission: "9-Speed PDK",
      drivetrain: "fWD",
      acceleration: "3.1s 0-60",
      topSpeed: "291 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 23,
    make: "buggati",
    model: "Chiron Super Sport",
    year: 2025,
    price: 1120000,
    image: "https://cdn.motor1.com/images/mgl/QE3q0/s3/2021-bugatti-chiron-super-sport-300.webp",
    specs: {
      engine: "6.0L Twin-Turbo Flat",
      horsepower: 1012,
      torque: "890 lb-ft",
      transmission: "12-Speed PDK",
      drivetrain: "RWD",
      acceleration: "1.7s 0-60",
      topSpeed: "300 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 24,
    make: "Mercedes",
    model: "AMG GT 63 S E Performance",
    year: 205,
    price: 430000,
    image: "https://tse3.mm.bing.net/th/id/OIP.W1a-1A4sweHwnZ6iiVBj6gHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L Twin-Turbo",
      horsepower: 540,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "199 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 25,
    make: "BMW",
    model: "M8 Competition",
    year: 2026,
    price: 520000,
    image: "https://tse4.mm.bing.net/th/id/OIP.iRQ_4KkcdgAdLlkr9MfzNwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L Twin-Turbo Flat-8",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "30s 0-60",
      topSpeed: "198 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 26,
    make: "Chevrolet",
    model: "Corvette Z06",
    year: 2024,
    price: 90000,
    image: "https://tse1.mm.bing.net/th/id/OIP.Q9tJzViThC7ZUi5cCHmPaQHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "4.0L supercharged ",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "7-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.7s 0-60",
      topSpeed: "200 mph",
      fuelEconomy: "12/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 27,
    make: "Ford",
    model: "GT Heritage Edition",
    year: 2024,
    price: 330000,
    image: "https://tse2.mm.bing.net/th/id/OIP.3PE_N0Y74EsPMZQ6Qz3UygHaEc?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 443,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "191 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 28,
    make: "Rimac",
    model: "Nevera",
    year: 2024,
    price: 520000,
    image: "https://media.autoexpress.co.uk/image/private/s--D84KZJtH--/v1671105948/evo/2022/12/Rimac%20Nevera%20review%20AP-15.jpg",
    specs: {
      engine: "carbon-sleeve permanent-magnet electric",
      horsepower: 900,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "209 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },
{
    id: 29,
    make: "Lucid",
    model: "Air Sapphire",
    year: 2024,
    price: 644000,
    image: "https://tse2.mm.bing.net/th/id/OIP.kTeoooYzHBCvIix0j0gjYgHaE-?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "hybrid",
      horsepower: 605,
      torque: "390 lb-ft",
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      acceleration: "3.5s 0-60",
      topSpeed: "206 mph",
      fuelEconomy: "18/24 mpg",
      seating: 4,
      cargo: "4.9 cu ft",
    },
    color: "#2a1a1a",
  },

];

const SPEC_LABELS = {
  engine: "Engine",
  horsepower: "Horsepower",
  torque: "Torque",
  transmission: "Transmission",
  drivetrain: "Drivetrain",
  acceleration: "0–60 mph",
  topSpeed: "Top Speed",
  fuelEconomy: "Fuel Economy",
  seating: "Seating",
  cargo: "Cargo Space",
};

const MAX_COMPARE = 3;

// Which numeric specs to highlight winner
const NUMERIC_KEYS = { horsepower: "high", seating: "high" };

function getBest(selected, key) {
  const vals = selected.map((c) => Number(c.specs[key])).filter((v) => !isNaN(v));
  if (!vals.length) return null;
  return NUMERIC_KEYS[key] === "high" ? Math.max(...vals) : Math.min(...vals);
}

export default function Compare() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [comparing, setComparing] = useState(false);

  const filtered = cars.filter(
    (c) =>
      `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find((s) => s.id === c.id)
  );

  const toggle = (car) => {
    if (selected.find((s) => s.id === car.id)) {
      setSelected(selected.filter((s) => s.id !== car.id));
    } else if (selected.length < MAX_COMPARE) {
      setSelected([...selected, car]);
    }
  };

  const remove = (id) => setSelected(selected.filter((s) => s.id !== id));
  const fmt = (n) => "$" + Number(n).toLocaleString();

  return (
    <div style={styles.root}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <p style={styles.eyebrow}>SIDE BY SIDE</p>
            <h1 style={styles.title}>Compare Cars</h1>
          </div>
          {selected.length >= 2 && (
            <button style={styles.cta} onClick={() => setComparing((v) => !v)}>
              {comparing ? "← Back to Selection" : `Compare ${selected.length} Cars →`}
            </button>
          )}
        </div>

        {/* Selected bar */}
        {selected.length > 0 && (
          <div style={styles.selectedBar}>
            {selected.map((car) => (
              <div key={car.id} style={styles.selectedChip}>
                <img src={car.image} alt={car.model} style={styles.chipImg} />
                <span style={styles.chipLabel}>
                  {car.year} {car.make} {car.model}
                </span>
                <button style={styles.chipRemove} onClick={() => remove(car.id)}>
                  ✕
                </button>
              </div>
            ))}
            {selected.length < MAX_COMPARE && (
              <div style={styles.chipPlaceholder}>
                + Add car ({MAX_COMPARE - selected.length} left)
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── COMPARE TABLE ── */}
      {comparing ? (
        <div style={styles.tableWrap}>
          {/* Car headers */}
          <div style={styles.tableGrid(selected.length)}>
            <div style={styles.labelCol} />
            {selected.map((car) => (
              <div key={car.id} style={{ ...styles.carCol, background: car.color }}>
                <img src={car.image} alt={car.model} style={styles.tableImg} />
                <p style={styles.tableCarMake}>{car.make}</p>
                <p style={styles.tableCarModel}>{car.model}</p>
                <p style={styles.tableCarYear}>{car.year}</p>
                <p style={styles.tablePrice}>{fmt(car.price)}</p>
              </div>
            ))}

            {/* Spec rows */}
            {Object.keys(SPEC_LABELS).map((key, i) => {
              const best = NUMERIC_KEYS[key] ? getBest(selected, key) : null;
              return (
                <>
                  <div
                    key={`label-${key}`}
                    style={{
                      ...styles.labelCell,
                      background: i % 2 === 0 ? "#0f0f0f" : "#141414",
                    }}
                  >
                    {SPEC_LABELS[key]}
                  </div>
                  {selected.map((car) => {
                    const val = car.specs[key];
                    const isWinner = best !== null && Number(val) === best;
                    return (
                      <div
                        key={`${car.id}-${key}`}
                        style={{
                          ...styles.specCell,
                          background: i % 2 === 0 ? "#111" : "#161616",
                          color: isWinner ? "#d4a843" : "#e0e0e0",
                          fontWeight: isWinner ? 700 : 400,
                        }}
                      >
                        {val}
                        {isWinner && <span style={styles.winBadge}>★ BEST</span>}
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── CAR PICKER ── */
        <div style={styles.picker}>
          <input
            style={styles.search}
            placeholder="🔍  Search make, model, year…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={styles.grid}>
            {filtered.map((car) => {
              const isSelected = !!selected.find((s) => s.id === car.id);
              const disabled = !isSelected && selected.length >= MAX_COMPARE;
              return (
                <div
                  key={car.id}
                  style={{
                    ...styles.card,
                    opacity: disabled ? 0.4 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                    outline: isSelected ? "2px solid #d4a843" : "2px solid transparent",
                  }}
                  onClick={() => !disabled && toggle(car)}
                >
                  <div style={styles.cardImgWrap}>
                    <img src={car.image} alt={car.model} style={styles.cardImg} />
                    {isSelected && <div style={styles.selectedOverlay}>✓ Selected</div>}
                  </div>
                  <div style={styles.cardBody}>
                    <p style={styles.cardMake}>{car.make}</p>
                    <p style={styles.cardModel}>
                      {car.year} {car.model}
                    </p>
                    <div style={styles.cardFooter}>
                      <span style={styles.cardPrice}>{fmt(car.price)}</span>
                      <span style={styles.cardHp}>{car.specs.horsepower} hp</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p style={styles.empty}>No cars found matching "{search}"</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#e0e0e0",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: {
    borderBottom: "1px solid #222",
    padding: "2rem 2.5rem 0",
    background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "1.5rem",
  },
  eyebrow: {
    letterSpacing: "0.2em",
    fontSize: "0.7rem",
    color: "#d4a843",
    fontWeight: 600,
    marginBottom: "0.3rem",
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "#fff",
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  cta: {
    background: "#d4a843",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    padding: "0.75rem 1.5rem",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "transform 0.15s",
    whiteSpace: "nowrap",
  },
  selectedBar: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem 0",
    flexWrap: "wrap",
  },
  selectedChip: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "50px",
    padding: "0.3rem 0.7rem 0.3rem 0.3rem",
  },
  chipImg: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  chipLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#e0e0e0",
  },
  chipRemove: {
    background: "none",
    border: "none",
    color: "#888",
    cursor: "pointer",
    fontSize: "0.75rem",
    padding: "0 0.1rem",
  },
  chipPlaceholder: {
    display: "flex",
    alignItems: "center",
    padding: "0.3rem 1rem",
    background: "#111",
    border: "1px dashed #333",
    borderRadius: "50px",
    fontSize: "0.8rem",
    color: "#555",
  },
  picker: {
    padding: "2rem 2.5rem",
  },
  search: {
    width: "100%",
    maxWidth: "480px",
    background: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    color: "#e0e0e0",
    fontSize: "0.95rem",
    padding: "0.75rem 1rem",
    marginBottom: "2rem",
    outline: "none",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#111",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardImgWrap: {
    position: "relative",
    overflow: "hidden",
    height: "160px",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  selectedOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(212,168,67,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#fff",
    backdropFilter: "blur(2px)",
  },
  cardBody: {
    padding: "1rem",
  },
  cardMake: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    color: "#888",
    textTransform: "uppercase",
    margin: "0 0 0.25rem",
  },
  cardModel: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 0.75rem",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    color: "#d4a843",
    fontWeight: 700,
    fontSize: "1rem",
  },
  cardHp: {
    color: "#666",
    fontSize: "0.8rem",
  },
  empty: {
    color: "#555",
    gridColumn: "1/-1",
    textAlign: "center",
    padding: "3rem",
  },

  // Table
  tableWrap: {
    padding: "2rem 2.5rem",
    overflowX: "auto",
  },
  tableGrid: (count) => ({
    display: "grid",
    gridTemplateColumns: `220px repeat(${count}, 1fr)`,
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #222",
    minWidth: "640px",
  }),
  labelCol: {
    background: "#0a0a0a",
  },
  carCol: {
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    borderLeft: "1px solid #1e1e1e",
  },
  tableImg: {
    width: "100%",
    maxWidth: "180px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },
  tableCarMake: {
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    color: "#888",
    textTransform: "uppercase",
    margin: 0,
  },
  tableCarModel: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    textAlign: "center",
  },
  tableCarYear: {
    fontSize: "0.8rem",
    color: "#666",
    margin: 0,
  },
  tablePrice: {
    color: "#d4a843",
    fontWeight: 700,
    fontSize: "1.1rem",
    margin: "0.4rem 0 0",
  },
  labelCell: {
    padding: "0.9rem 1.25rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #1a1a1a",
  },
  specCell: {
    padding: "0.9rem 1rem",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0.2rem",
    borderLeft: "1px solid #1a1a1a",
    borderTop: "1px solid #1a1a1a",
    textAlign: "center",
  },
  winBadge: {
    fontSize: "0.6rem",
    letterSpacing: "0.1em",
    color: "#d4a843",
    fontWeight: 700,
  },
};