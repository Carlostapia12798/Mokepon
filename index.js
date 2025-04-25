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
  jugadores.push(jugador); // Lo agregamos al array de jugadores
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitimos conexión desde cualquier origen
  res.send(id); // Enviamos el ID como respuesta
});

// ✅ Endpoint POST para asignar un Mokepon al jugador
app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""; // Obtenemos el ID del jugador desde la URL
  const mascota = req.body.mokepon || ""; // Obtenemos el nombre del Mokepon desde el body de la petición
  const mokepon = new Mokepon(mascota); // Creamos una instancia de Mokepon con ese nombre

  // Buscamos al jugador correspondiente
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, le asignamos el Mokepon
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asiganrMokepon(mokepon);
  }

  console.log(jugadores); // Mostramos los jugadores por consola
  console.log(jugadorId); // También mostramos el ID recibido

  res.end(); // Terminamos la respuesta
});

// Activamos el servidor en el puerto 8080
app.listen(8080, () => {
  console.log("el servidor esta en funcionamiento");
});
