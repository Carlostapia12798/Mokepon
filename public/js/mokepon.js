// =============================================
// CONSTANTES Y VARIABLES GLOBALES
// =============================================

// Elementos del DOM relacionados con la selección de ataques y reinicio
const seccionSelecionataque = document.getElementById("Seleccionar-ataque");
const seccionReinicio = document.getElementById("reiniciar");
const btnSeleccion = document.getElementById("btn-seleccion");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Elementos del DOM para la selección de mascotas
const seccionSelecion = document.getElementById("Seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

// Elementos del DOM para mostrar información del enemigo
const mascotaEnemigo = document.getElementById("mascota-enemigo");

// Elementos del DOM para mostrar vidas
const vidasJugador = document.getElementById("Vida-jugador");
const vidasEnemigo = document.getElementById("Vida-enemigo");

// Elementos del DOM para mostrar resultados y ataques
const seccionMensaje = document.getElementById("resultado");
const ataquedelJugador = document.getElementById("ataquesJugador");
const ataquedelEnemigo = document.getElementById("ataquesEnemigos");

// Contenedores para tarjetas y ataques
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

// Elementos del DOM para el mapa del juego
const seccionVerMapar = document.getElementById("ver-mapa");
const Mapa = document.getElementById("mapa");

// Variables de estado del juego
let jugadorId = null; // ID único del jugador
let enemigoId = null; // ID del enemigo
let mokepones = []; // Array de todos los mokepones disponibles
let mokeponEnemigos = []; // Array de mokepones enemigos
let ataqueJugador = []; // Ataques seleccionados por el jugador
let ataqueEnemigo = []; // Ataques del enemigo
let opcionDeMokepones; // Plantilla HTML para mostrar mokepones
let opcionDeAtaques; // Plantilla HTML para mostrar ataques
let ataquesMokeponEnemigo; // Ataques del mokepon enemigo

// Variables para los mokepones
let miMokepon;
let Hipodoge;
let Capipepo;
let Ratigueya;
let Pydos;
let Tucupalma;
let Langostelvis;

// Variables para los botones de ataque
let btnFuego;
let btnAgua;
let btnPlanta;
let botones = [];
let iAtaqueJugador;
let iAtaqueEnemigo;

// Variables del juego
let mascotaJugador; // Mokepon seleccionado por el jugador
let victoriasJugador = 0; // Contador de victorias del jugador
let victoriasEnemigo = 0; // Contador de victorias del enemigo

// Variables para el canvas y el mapa
let lienzo = Mapa.getContext("2d");
let intervalo; // Intervalo para animaciones
let mapaFondo = new Image(); // Imagen de fondo del mapa
mapaFondo.src = "./assets/Fondo  _Mokepon_.png";

// Ajustes de dimensiones del mapa
let alturaQueBuscamos;
let anchoDeLaPantalla = window.innerWidth - 20;
const anchoMaxMapa = 350;

if (anchoDeLaPantalla > anchoMaxMapa) {
  anchoDeLaPantalla = anchoMaxMapa - 20;
}

alturaQueBuscamos = (anchoDeLaPantalla * 600) / 800;
Mapa.width = anchoDeLaPantalla;
Mapa.height = alturaQueBuscamos;

// =============================================
// DEFINICIÓN DE ATAQUES PARA CADA MOKEPON
// =============================================

const hipodogeAtaques = [
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" },
];

const capipepoAtaques = [
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
];

const ratigueyaAtaques = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" },
];

// =============================================
// CLASE MOKEPON
// =============================================

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40; // Ancho del sprite en el mapa
    this.alto = 40; // Alto del sprite en el mapa
    this.x = numeroAleatorio(0, Mapa.width - this.ancho); // Posición X inicial aleatoria
    this.y = numeroAleatorio(0, Mapa.height - this.alto); // Posición Y inicial aleatoria
    this.mapaFoto = new Image(); // Imagen para el mapa
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0; // Velocidad en el eje X
    this.velocidadY = 0; // Velocidad en el eje Y
  }

  /**
   * Método para dibujar el Mokepon en el canvas
   */
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

// Creación de instancias de Mokepones
let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "./assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  3,
  "./assets/capipepo.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "./assets/ratigueya.png"
);

let pydos = new Mokepon(
  "Pydos",
  "./assets/mokepons_mokepon_pydos_attack.png",
  3,
  "./assets/mokepons_mokepon_pydos_attack.png"
);

let tucupalma = new Mokepon(
  "Tucupalma",
  "./assets/mokepons_mokepon_tucapalma_attack.png",
  3,
  "./assets/mokepons_mokepon_tucapalma_attack.png"
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "./assets/mokepons_mokepon_langostelvis_attack.png",
  3,
  "./assets/mokepons_mokepon_langostelvis_attack.png"
);

// Asignación de ataques a cada Mokepon
hipodoge.ataques.push(...hipodogeAtaques);
capipepo.ataques.push(...capipepoAtaques);
ratigueya.ataques.push(...ratigueyaAtaques);

pydos.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" }
);

tucupalma.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🔥", id: "btn-fuego" }
);

langostelvis.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

// Agregar todos los Mokepones al array principal
mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucupalma, langostelvis);

// =============================================
// FUNCIONES PRINCIPALES DEL JUEGO
// =============================================

/**
 * Función que inicializa el juego
 */
function iniciarJuego() {
  // Ocultar secciones que no se usan al inicio
  seccionSelecionataque.style.display = "none";
  seccionVerMapar.style.display = "none";

  // Mostrar las opciones de Mokepones disponibles
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />           
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <P>${mokepon.nombre}</P>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  // Obtener referencias a los elementos del DOM de cada Mokepon
  Hipodoge = document.getElementById("Hipodoge");
  Capipepo = document.getElementById("Capipepo");
  Ratigueya = document.getElementById("Ratigueya");
  Pydos = document.getElementById("Pydos");
  Tucupalma = document.getElementById("Tucupalma");
  Langostelvis = document.getElementById("Langostelvis");

  // Ocultar sección de reinicio al inicio
  seccionReinicio.style.display = "none";

  // Agregar event listeners a los botones principales
  btnSeleccion.addEventListener("click", seleccionarMascota);
  btnReiniciar.addEventListener("click", reiniciarJuego);

  // Unirse al juego (conexión con el servidor)
  unirseAlJuego();
}

/**
 * Función para unirse al juego (conectar con el servidor)
 */
function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta; // Asignar ID único al jugador
      });
    }
  });
}

/**
 * Función para seleccionar la mascota del jugador
 */
function seleccionarMascota() {
  // Verificar qué Mokepon ha seleccionado el jugador
  if (Hipodoge.checked) {
    spanMascotaJugador.innerHTML = Hipodoge.id;
    mascotaJugador = Hipodoge.id;
  } else if (Capipepo.checked) {
    spanMascotaJugador.innerHTML = Capipepo.id;
    mascotaJugador = Capipepo.id;
  } else if (Ratigueya.checked) {
    spanMascotaJugador.innerHTML = Ratigueya.id;
    mascotaJugador = Ratigueya.id;
  } else if (Pydos.checked) {
    spanMascotaJugador.innerHTML = Pydos.id;
    mascotaJugador = Pydos.id;
  } else if (Tucupalma.checked) {
    spanMascotaJugador.innerHTML = Tucupalma.id;
    mascotaJugador = Tucupalma.id;
  } else if (Langostelvis.checked) {
    spanMascotaJugador.innerHTML = Langostelvis.id;
    mascotaJugador = Langostelvis.id;
  } else {
    alert("Selecciona una mascota");
    return; // Salir si no se seleccionó ninguna mascota
  }

  // Ocultar sección de selección y mostrar el mapa
  seccionSelecion.style.display = "none";

  // Notificar al servidor sobre la selección del Mokepon
  seleccionarMokepon(mascotaJugador);

  // Extraer y mostrar los ataques del Mokepon seleccionado
  extraerAtaques(mascotaJugador);

  // Mostrar el mapa y comenzar el juego
  seccionVerMapar.style.display = "flex";
  iniciarMapa();
}

/**
 * Función para notificar al servidor sobre la selección del Mokepon
 * @param {string} mascotaJugador - Nombre del Mokepon seleccionado
 */
function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId} `, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

/**
 * Función para extraer los ataques del Mokepon seleccionado
 * @param {string} mascotaJugador - Nombre del Mokepon seleccionado
 */
function extraerAtaques(mascotaJugador) {
  let ataques;

  // Buscar los ataques del Mokepon seleccionado
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  // Mostrar los ataques en la interfaz
  mostrarAtaques(ataques);
}

/**
 * Función para mostrar los ataques en la interfaz
 * @param {Array} ataques - Array de objetos con información de los ataques
 */
function mostrarAtaques(ataques) {
  // Crear botones para cada ataque disponible
  ataques.forEach((ataque) => {
    opcionDeAtaques = `
    <button id=${ataque.id} class="btn-ataque Bataque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += opcionDeAtaques;
  });

  // Obtener referencias a los botones de ataque
  btnFuego = document.getElementById("btn-fuego");
  btnAgua = document.getElementById("btn-agua");
  btnPlanta = document.getElementById("btn-planta");
  botones = document.querySelectorAll(".Bataque");
}

/**
 * Función para manejar la secuencia de ataques del jugador
 */
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      // Registrar el ataque según el emoji del botón
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("Fuego");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("Agua");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("Planta");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }

      // Si ya se seleccionaron 5 ataques, enviarlos al servidor
      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}

/**
 * Función para enviar los ataques al servidor
 */
function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  // Comenzar a verificar los ataques del enemigo
  intervalo = setInterval(obtenerAtaques, 50);
}

/**
 * Función para obtener los ataques del enemigo desde el servidor
 */
function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ ataques }) {
        // Cuando el enemigo haya seleccionado sus 5 ataques
        if (ataques.length === 5) {
          ataqueEnemigo = ataques;
          combate(); // Iniciar el combate
        }
      });
    }
  });
}

/**
 * Función para seleccionar y mostrar la mascota enemiga
 * @param {Object} enemigo - Objeto con información del Mokepon enemigo
 */
function seleccionarMascotaEnemigo(enemigo) {
  mascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque(); // Habilitar los ataques del jugador
}

/**
 * Función para generar un número aleatorio entre min y max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatorio entre min y max
 */
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Función para que el enemigo seleccione ataques aleatorios
 */
function ataqueAleatorioEnemigo() {
  let ataqueRandom = numeroAleatorio(0, ataquesMokeponEnemigo.length - 1);

  // Registrar el ataque según el emoji seleccionado
  if (ataquesMokeponEnemigo[ataqueRandom].nombre === "🔥") {
    ataqueEnemigo.push("Fuego");
  } else if (ataquesMokeponEnemigo[ataqueRandom].nombre === "💧") {
    ataqueEnemigo.push("Agua");
  } else {
    ataqueEnemigo.push("Planta");
  }
  iniciarPelea();
}

/**
 * Función para iniciar la pelea cuando ambos jugadores tienen sus ataques
 */
function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

/**
 * Función para registrar los ataques del turno actual
 * @param {number} jugador - Índice del ataque del jugador
 * @param {number} enemigo - Índice del ataque del enemigo
 */
function resultadoDelCombate(jugador, enemigo) {
  iAtaqueJugador = ataqueJugador[jugador];
  iAtaqueEnemigo = ataqueEnemigo[enemigo];
}

/**
 * Función principal del combate que compara los ataques
 */
function combate() {
  clearInterval(intervalo);

  // Comparar cada par de ataques
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      resultadoDelCombate(i, i);
      crearMensaje("Empate 🤝");
    } else if (ataqueJugador[i] == "Fuego" && ataqueEnemigo[i] == "Planta") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste este turno! 🎉");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "Agua" && ataqueEnemigo[i] == "Fuego") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "Planta" && ataqueEnemigo[i] == "Agua") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else {
      resultadoDelCombate(i, i);
      crearMensaje("Perdiste");
      victoriasEnemigo++;
      vidasEnemigo.innerHTML = victoriasEnemigo;
    }
    revisarVctorias();
  }
}

/**
 * Función para revisar quién ganó la batalla
 */
function revisarVctorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un Empate 🤝");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡Felicidades! Ganaste la batalla 🏆");
  } else {
    crearMensajeFinal("¡Lo siento! Perdiste la batalla 💀");
  }
}

/**
 * Función para crear mensajes de resultado por turno
 * @param {string} resultado - Mensaje a mostrar
 */
function crearMensaje(resultado) {
  let notAtaqueJugador = document.createElement("p");
  let notAtaqueEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  notAtaqueJugador.innerHTML = iAtaqueJugador;
  notAtaqueEnemigo.innerHTML = iAtaqueEnemigo;

  ataquedelJugador.appendChild(notAtaqueJugador);
  ataquedelEnemigo.appendChild(notAtaqueEnemigo);
}

/**
 * Función para mostrar el mensaje final del combate
 * @param {string} resultadoFinal - Mensaje final a mostrar
 */
function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
  seccionReinicio.style.display = "block"; // Mostrar botón de reinicio
}

/**
 * Función para reiniciar el juego
 */
function reiniciarJuego() {
  location.reload();
}

// =============================================
// FUNCIONES RELACIONADAS CON EL MAPA
// =============================================

/**
 * Función para pintar el canvas y actualizar las posiciones
 */
function PintarCanvas() {
  // Actualizar posición del Mokepon del jugador
  miMokepon.x += miMokepon.velocidadX;
  miMokepon.y += miMokepon.velocidadY;

  // Limpiar y redibujar el canvas
  lienzo.clearRect(0, 0, Mapa.width, Mapa.height);
  lienzo.drawImage(mapaFondo, 0, 0, Mapa.width, Mapa.height);
  miMokepon.pintarMokepon();

  // Enviar la posición actual al servidor
  enviarPoscicion(miMokepon.x, miMokepon.y);

  // Pintar y verificar colisión con los Mokepones enemigos
  mokeponEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

/**
 * Función para enviar la posición del jugador al servidor
 * @param {number} x - Posición en el eje X
 * @param {number} y - Posición en el eje Y
 */
function enviarPoscicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        // Mapear los enemigos recibidos a objetos Mokepon
        mokeponEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre || "";

          // Crear el Mokepon enemigo según su tipo
          if (mokeponNombre === "Hipodoge") {
            mokeponEnemigo = new Mokepon(
              "Hipodoge",
              "./assets/mokepons_mokepon_hipodoge_attack.webp",
              3,
              "./assets/hipodoge.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Capipepo") {
            mokeponEnemigo = new Mokepon(
              "Capipepo",
              "./assets/mokepons_mokepon_capipepo_attack.webp",
              3,
              "./assets/capipepo.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Ratigueya") {
            mokeponEnemigo = new Mokepon(
              "Ratigueya",
              "./assets/mokepons_mokepon_ratigueya_attack.webp",
              3,
              "./assets/ratigueya.png",
              enemigo.id
            );
          }

          // Asignar posición del enemigo
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}

// Funciones de movimiento del Mokepon
function moverArriba() {
  miMokepon.velocidadY = -5;
}

function moverIzquierda() {
  miMokepon.velocidadX = -5;
}

function moverAbajo() {
  miMokepon.velocidadY = 5;
}

function moverDerecha() {
  miMokepon.velocidadX = 5;
}

function detenerMovimiento() {
  miMokepon.velocidadX = 0;
  miMokepon.velocidadY = 0;
}

/**
 * Función para manejar el movimiento con las teclas
 * @param {Event} event - Evento de teclado
 */
function sePrecionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      alert("Por favor, Precione una tecla permitida.");
      break;
  }
}

/**
 * Función para iniciar el mapa y configurar controles
 */
function iniciarMapa() {
  // Obtener el objeto Mokepon del jugador
  miMokepon = obtenerObjetoMascota(mascotaJugador);

  // Iniciar el bucle de animación
  intervalo = setInterval(PintarCanvas, 50);

  // Configurar event listeners para el teclado
  window.addEventListener("keydown", sePrecionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

/**
 * Función para obtener el objeto Mokepon por nombre
 * @returns {Mokepon} Objeto Mokepon del jugador
 */
function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

/**
 * Función para revisar colisiones con enemigos
 * @param {Mokepon} enemigo - Objeto Mokepon enemigo
 */
function revisarColision(enemigo) {
  // Calcular límites del enemigo
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  // Calcular límites del jugador
  const arribaMascota = miMokepon.y;
  const abajoMascota = miMokepon.y + miMokepon.alto;
  const derechaMascota = miMokepon.x + miMokepon.ancho;
  const izquierdaMascota = miMokepon.x;

  // Verificar si no hay colisión
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  // Verificar si el enemigo tiene posición válida
  if (enemigo.x === undefined || enemigo.y === undefined) {
    return;
  }

  // Si hay colisión:
  detenerMovimiento();
  clearInterval(intervalo);
  console.log("se realizo una colision");

  // Configurar el combate con el enemigo
  enemigoId = enemigo.id;
  seccionSelecionataque.style.display = "flex";
  seccionVerMapar.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}

// Iniciar el juego cuando la página cargue
window.addEventListener("load", iniciarJuego);
