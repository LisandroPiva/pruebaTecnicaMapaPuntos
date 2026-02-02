let map;
let markersLayer;

function setStatus(msg) {
  document.getElementById("status").textContent = msg;
}

function initMap() {
  // Centro por defecto (BA) por si todavía no cargó nada
  map = L.map("map").setView([-34.6037, -58.3816], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Capa para marcadores (así los limpiás fácil cuando recargás)
  markersLayer = L.layerGroup().addTo(map);
}

function clearMarkers() {
  markersLayer.clearLayers();
}

function popupHtml(p) {
  return `
    <div>
      <div><strong>Recurso ${p.id}</strong></div>
      <div><small>tiempo: ${p.tiempo}</small></div>
      <div><small>lat: ${p.lat} / long: ${p.long}</small></div>
    </div>
  `;
}

async function cargarRecursosYpintar() {
  setStatus("Cargando...");
  clearMarkers();

  try {
    const resp = await fetch("/recursos");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const recursos = await resp.json();

    if (!Array.isArray(recursos)) {
      throw new Error("La API no devolvió un array");
    }
    if (recursos.length === 0) {
      setStatus("No hay puntos para mostrar");
      return;
    }

    // Pintar TODOS los puntos
    const bounds = [];

    for (const p of recursos) {
      // Validar campos requeridos por consigna
      if (typeof p.lat !== "number" || typeof p.long !== "number" || typeof p.tiempo !== "string") {
        throw new Error("Formato inválido: cada item debe tener lat(number), long(number), tiempo(string ISO)");
      }

      const lat = p.lat;
      const lng = p.long; // Leaflet usa 'lng', acá mapeamos long -> lng

      L.marker([lat, lng])
        .addTo(markersLayer)
        .bindPopup(popupHtml(p));

      bounds.push([lat, lng]);
    }

    // Ajustar zoom para ver todos
    map.fitBounds(bounds, { padding: [30, 30] });

    setStatus(`OK: ${recursos.length} punto(s)`);
  } catch (err) {
    console.error(err);
    setStatus("Error: no se pudo cargar /recursos");
    alert("Error cargando recursos. Mirá la consola (F12) para detalle.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  cargarRecursosYpintar();

  document.getElementById("btnRecargar").addEventListener("click", () => {
    cargarRecursosYpintar();
  });
});
