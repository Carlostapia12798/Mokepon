// Importamos Express para crear el servidor web
const express = require("express");
// Importamos CORS para permitir peticiones entre dominios
const cors = require("cors");

// =============================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// =============================================

// Creamos una aplicación de Express
const app = express();

// Configuramos middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Habilitamos CORS para permitir peticiones desde otros orígenes
// (por ejemplo, desde tu frontend en desarrollo en localhost:8080)
app.use(cors());

// Configuramos middleware para parsear JSON en el cuerpo de las peticiones POST
app.use(express.json());

// Array para almacenar los jugadores conectados
const jugadores = [];

/**
 * Clase que representa un Jugador en el juego
 */
class Jugador {
  constructor(id) {
    this.id = id; // ID único del jugador
    this.mokepon = null; // Mokepon asignado (inicialmente null)
    this.x = 0; // Posición X en el mapa
    this.y = 0; // Posición Y en el mapa
    this.ataques = []; // Array de ataques del jugador
  }

  /**
   * Asigna un Mokepon al jugador
   * @param {Mokepon} mokepon - Instancia del Mokepon a asignar
   */
  asiganrMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  /**
   * Actualiza la posición del jugador en el mapa
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   */
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Asigna los ataques del jugador
   * @param {Array} ataques - Array con los ataques del jugador
   */
  asignarAtaques(ataques) {
    this.ataques = ataques;
  }
}

/**
 * Clase que representa un Mokepon en el juego
 */
class Mokepon {
  constructor(nombre) {
    this.nombre = nombre; // Nombre del Mokepon
  }
}

// =============================================
// ENDPOINTS DEL API
// =============================================

/**
 * Endpoint para que un jugador se una al juego
 * Método: GET
 * Ruta: /unirse
 * Respuesta: ID único del jugador
 */
app.get("/unirse", (req, res) => {
  // Generamos un ID aleatorio para el nuevo jugador
  const id = `${Math.random()}`;

  // Creamos una nueva instancia de Jugador
  const jugador = new Jugador(id);

  // Añadimos el jugador al array de jugadores
  jugadores.push(jugador);

  // Configuramos cabeceras CORS (redundante, ya lo hace el middleware)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Enviamos el ID del jugador como respuesta
  res.send(id);
});

/**
 * Endpoint para asignar un Mokepon a un jugador
 * Método: POST
 * Ruta: /mokepon/:jugadorId
 * Body: { mokepon: "nombreMokepon" }
 */
app.post("/mokepon/:jugadorId", (req, res) => {
  // Obtenemos el ID del jugador desde los parámetros de la URL
  const jugadorId = req.params.jugadorId || "";

  // Obtenemos el nombre del Mokepon desde el cuerpo de la petición
  const mascota = req.body.mokepon || "";

  // Creamos una nueva instancia del Mokepon
  const mokepon = new Mokepon(mascota);

  // Buscamos el índice del jugador en el array
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, le asignamos el Mokepon
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asiganrMokepon(mokepon);
  }

  // Finalizamos la respuesta
  res.end();
});

/**
 * Endpoint para actualizar la posición de un jugador y obtener información de enemigos
 * Método: POST
 * Ruta: /mokepon/:jugadorId/posicion
 * Body: { x: number, y: number }
 * Respuesta: { enemigos: Array }
 */
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  // Obtenemos el ID del jugador desde los parámetros de la URL
  const jugadorId = req.params.jugadorId || "";

  // Obtenemos las coordenadas X e Y desde el cuerpo de la petición
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  // Buscamos el índice del jugador en el array
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, actualizamos su posición
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  // Filtramos los jugadores para obtener solo los enemigos (todos menos el actual)
  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  // Enviamos la lista de enemigos como respuesta
  res.send({
    enemigos,
  });
});

/**
 * Endpoint para asignar ataques a un jugador
 * Método: POST
 * Ruta: /mokepon/:jugadorId/ataques
 * Body: { ataques: Array }
 */
app.post("/mokepon/:jugadorId/ataques", (req, res) => {
  // Obtenemos el ID del jugador desde los parámetros de la URL
  const jugadorId = req.params.jugadorId || "";

  // Obtenemos los ataques desde el cuerpo de la petición
  const ataques = req.body.ataques || [];

  // Buscamos el índice del jugador en el array
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  // Si encontramos al jugador, le asignamos los ataques
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques);
  }

  // Finalizamos la respuesta
  res.end();
});

/**
 * Endpoint para obtener los ataques de un jugador
 * Método: GET
 * Ruta: /mokepon/:jugadorId/ataques
 * Respuesta: { ataques: Array }
 */
app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  // Obtenemos el ID del jugador desde los parámetros de la URL
  const jugadorId = req.params.jugadorId || "";

  // Buscamos al jugador en el array
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId);

  // Enviamos los ataques del jugador (o array vacío si no tiene)
  res.send({
    ataques: jugador?.ataques || [],
  });
});

// Iniciamos el servidor en el puerto 8080
app.listen(8080, () => {
  console.log("El servidor está en funcionamiento en el puerto 8080");
});
