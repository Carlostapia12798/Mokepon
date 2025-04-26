// Importamos Express y CORS
const express = require("express");
const cors = require("cors");

// Creamos una app de Express
const app = express();

// Activamos CORS para permitir peticiones desde otros orígenes (por ejemplo, desde tu frontend en localhost:5500)
app.use(cors());

// Activamos el middleware para leer JSON en los cuerpos de las peticiones POST
app.use(express.json());

// Array para guardar los jugadores que se conectan
const jugadores = [];

// Clase Jugador
class Jugador {
  constructor(id) {
    this.id = id;
  }

  // Método para asignarle un Mokepon a un jugador
  asiganrMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }

  asignarAtaques(ataques) {
    this.ataques = ataques;
  }
}

// Clase Mokepon
class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

// ✅ Endpoint GET para unirse al juego
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`; // Creamos un ID aleatorio como string
  const jugador = new Jugador(id); // Creamos un nuevo jugador con ese ID
  jugadores.push(jugador);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitimos conexión desde cualquier origen
  res.send(id); // Enviamos el ID como respuesta
});

// ✅ Endpoint POST para asignar un Mokepon al jugador
app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""; // Obtenemos el ID del jugador desde la URL
  const mascota = req.body.mokepon || ""; // Obtenemos el nombre del Mokepon desde el body de la petición
  const mokepon = new Mokepon(mascota); // Creamos una instancia de Mokepon

  // Buscamos al jugador correspondiente
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, le asignamos el Mokepon
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asiganrMokepon(mokepon);
  }
  res.end(); // Terminamos la respuesta
});

// ✅ Endpoint POST para actualizar la posición del jugador
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  res.send({
    enemigos,
  });
});

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || ""; // Obtenemos el ID del jugador desde la URL
  const ataques = req.body.ataques || []; // Obtenemos el nombre del Mokepon desde el body de la petición

  // Buscamos al jugador correspondiente
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, le asignamos el Mokepon
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques);
  }
  res.end(); // Terminamos la respuesta
});

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId);

  res.send({
    ataques: jugador.ataques || [],
  });
});

// Activamos el servidor en el puerto 8080
app.listen(8080, () => {
  console.log("el servidor esta en funcionamiento");
});
