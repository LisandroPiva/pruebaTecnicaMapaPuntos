Proyecto simple que expone una API GET /recursos y un frontend (HTML/JS) que consume ese endpoint y pinta puntos en un mapa usando Leaflet + OpenStreetMap.

Requisitos

Node.js instalado (incluye npm)

Instalación

Clonar el repositorio:
git clone <URL_DEL_REPO>
cd <CARPETA_DEL_PROYECTO>

Instalar dependencias:
npm install

Ejecutar

Opción A: modo normal
node src/entrypoint.js

Opción B: modo desarrollo (recarga automática)
npm run dev

(Si no existe el script dev, agregalo en package.json:
"dev": "nodemon src/entrypoint.js")

Endpoints

Frontend (mapa):
http://localhost:3000/

API (recursos):
http://localhost:3000/recursos

El endpoint /recursos devuelve un array de objetos con el formato:

lat (number)

long (number)

tiempo (string ISO)

Ejemplo:
[
{ "id": 1, "lat": -34.6037, "long": -58.3816, "tiempo": "2026-02-02T12:00:00.000Z" }
]

Estructura del proyecto

.
├── src
│ └── entrypoint.js # Backend (Express)
├── public
│ ├── index.html # Frontend
│ └── app.js # Fetch a /recursos + Leaflet markers
├── package.json
└── package-lock.json

Notas

El frontend se sirve desde el mismo backend (carpeta public/), por lo que no hay problemas de CORS.

Leaflet usa lng, pero en esta consigna la API entrega long. En el frontend se mapea long -> lng al crear los marcadores.
