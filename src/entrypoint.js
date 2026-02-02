const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend desde /public
app.use(express.static(path.join(__dirname, "..", "public")));

// Datos hardcodeados (lat, long, tiempo ISO)
const recursos = [
  { id: 1, lat: -34.6037, long: -58.3816, tiempo: "2026-02-02T12:00:00.000Z" },
  { id: 2, lat: -34.6158, long: -58.4333, tiempo: "2026-02-02T12:10:00.000Z" },
  { id: 3, lat: -34.5889, long: -58.4467, tiempo: "2026-02-02T12:20:00.000Z" },
];

app.get("/recursos", (req, res) => {
  res.status(200).json(recursos);
});

// Asegurar que / muestre el index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
