const seccionSelecionataque = document.getElementById("Seleccionar-ataque");
const seccionReinicio = document.getElementById("reiniciar");
const btnSeleccion = document.getElementById("btn-seleccion");
const btnReiniciar = document.getElementById("btn-reiniciar");

const seccionSelecion = document.getElementById("Seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const mascotaEnemigo = document.getElementById("mascota-enemigo");

const vidasJugador = document.getElementById("Vida-jugador");
const vidasEnemigo = document.getElementById("Vida-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquedelJugador = document.getElementById("ataquesJugador");
const ataquedelEnemigo = document.getElementById("ataquesEnemigos");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

const seccionVerMapar = document.getElementById("ver-mapa");
const Mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let opcionDeAtaques;
let ataquesMokeponEnemigo;

let miMokepon;
let Hipodoge;
let Capipepo;
let Ratigueya;
let Pydos;
let Tucupalma;
let Langostelvis;

let btnFuego;
let btnAgua;
let btnPlanta;
let botones = [];
let iAtaqueJugador;
let iAtaqueEnemigo;

let mascotaJugador;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

let lienzo = Mapa.getContext("2d");
let intervalo;
let mapaFondo = new Image();
mapaFondo.src = "/mokepon/assets/Fondo  _Mokepon_.png";

let alturaQueBuscamos;
let anchoDeLaPantalla = window.innerWidth - 20;

const anchoMaxMapa = 350;

if (anchoDeLaPantalla > anchoMaxMapa) {
  anchoDeLaPantalla = anchoMaxMapa - 20;
}

alturaQueBuscamos = (anchoDeLaPantalla * 600) / 800;
Mapa.width = anchoDeLaPantalla;
Mapa.height = alturaQueBuscamos;

//clases
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = numeroAleatorio(0, Mapa.width - this.ancho);
    this.y = numeroAleatorio(0, Mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  //metodos
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "/mokepon/assets/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "/mokepon/assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "/mokepon/assets/mokepons_mokepon_capipepo_attack.webp",
  3,
  "/mokepon/assets/capipepo.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "/mokepon/assets/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "/mokepon/assets/ratigueya.png"
);

let pydos = new Mokepon(
  "Pydos",
  "/mokepon/assets/mokepons_mokepon_pydos_attack.png",
  3
);

let tucupalma = new Mokepon(
  "Tucupalma",
  "/mokepon/assets/mokepons_mokepon_tucapalma_attack.png",
  3
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "/mokepon/assets/mokepons_mokepon_langostelvis_attack.png",
  3
);

let hipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "/mokepon/assets/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "/mokepon/assets/hipodoge.png"
);

let capipepoEnemigo = new Mokepon(
  "Capipepo",
  "/mokepon/assets/mokepons_mokepon_capipepo_attack.webp",
  3,
  "/mokepon/assets/capipepo.png"
);

let ratigueyaEnemigo = new Mokepon(
  "Ratigueya",
  "/mokepon/assets/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "/mokepon/assets/ratigueya.png"
);

hipodoge.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" }
);

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

hipodogeEnemigo.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

capipepoEnemigo.ataques.push(
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" }
);

ratigueyaEnemigo.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" }
);

mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucupalma, langostelvis);

function iniciarJuego() {
  seccionSelecionataque.style.display = "none";
  seccionVerMapar.style.display = "none";

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

  Hipodoge = document.getElementById("Hipodoge");
  Capipepo = document.getElementById("Capipepo");
  Ratigueya = document.getElementById("Ratigueya");
  Pydos = document.getElementById("Pydos");
  Tucupalma = document.getElementById("Tucupalma");
  Langostelvis = document.getElementById("Langostelvis");

  seccionReinicio.style.display = "none";

  btnSeleccion.addEventListener("click", seleccionarMascota);

  btnReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
      });
    } else {
    }
  });
}

function seleccionarMascota() {
  seccionSelecion.style.display = "none";

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
  }
  extraerAtaques(mascotaJugador);
  seccionVerMapar.style.display = "flex";
  iniciarMapa();
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionDeAtaques = `
    <button id=${ataque.id} class="btn-ataque Bataque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += opcionDeAtaques;
  });

  btnFuego = document.getElementById("btn-fuego");
  btnAgua = document.getElementById("btn-agua");
  btnPlanta = document.getElementById("btn-planta");
  botones = document.querySelectorAll(".Bataque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
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
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  mascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
  let ataqueRandom = numeroAleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataquesMokeponEnemigo[ataqueRandom].nombre === "🔥") {
    ataqueEnemigo.push("Fuego");
  } else if (ataquesMokeponEnemigo[ataqueRandom].nombre === "💧") {
    ataqueEnemigo.push("Agua");
  } else {
    ataqueEnemigo.push("Planta");
  }
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function resultadoDelCombate(jugador, enemigo) {
  iAtaqueJugador = ataqueJugador[jugador];
  iAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
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

function revisarVctorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un Empate 🤝");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡Felicidades! Ganaste la batalla 🏆");
  } else {
    crearMensajeFinal("¡Lo siento! Perdiste la batalla 💀");
  }
}

function crearMensaje(resultado) {
  let notAtaqueJugador = document.createElement("p");
  let notAtaqueEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  notAtaqueJugador.innerHTML = iAtaqueJugador;
  notAtaqueEnemigo.innerHTML = iAtaqueEnemigo;

  ataquedelJugador.appendChild(notAtaqueJugador);
  ataquedelEnemigo.appendChild(notAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
  seccionReinicio.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function PintarCanvas() {
  miMokepon.x += miMokepon.velocidadX;
  miMokepon.y += miMokepon.velocidadY;
  lienzo.clearRect(0, 0, Mapa.width, Mapa.height);
  lienzo.drawImage(mapaFondo, 0, 0, Mapa.width, Mapa.height);
  miMokepon.pintarMokepon();
  hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();

  if (miMokepon.velocidadX !== 0 || miMokepon.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  } else {
  }
}

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

function iniciarMapa() {
  miMokepon = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(PintarCanvas, 50);

  window.addEventListener("keydown", sePrecionoUnaTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = miMokepon.y;
  const abajoMascota = miMokepon.y + miMokepon.alto;
  const derechaMascota = miMokepon.x + miMokepon.ancho;
  const izquierdaMascota = miMokepon.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  seccionSelecionataque.style.display = "flex";
  seccionVerMapar.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}
//
window.addEventListener("load", iniciarJuego);
